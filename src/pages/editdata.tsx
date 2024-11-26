import { createSignal, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import Sidebar from "./sidebar";
import "./editdata.css";
import "boxicons/css/boxicons.min.css"; 

const EditData = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = createSignal<any>(null);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [role, setRole] = createSignal("User");
  const [newEmail, setNewEmail] = createSignal(email);
  const [showPassword, setShowPassword] = createSignal(false);

  onMount(() => {
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const users = JSON.parse(savedData);
      const user = users.find((u: any) => u.email === email);
      if (user) {
        setUserData(user);
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
        setNewEmail(user.email);
      }
    }
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const updatedData = {
      username: username(),
      email: newEmail(),
      password: password(),
      role: role(),
    };
    const savedData = localStorage.getItem("users");
    if (savedData) {
      const users = JSON.parse(savedData);
      const updatedUsers = users.map((user: any) => (user.email === email ? updatedData : user));
      // Remove old user if email has changed
      if (email !== newEmail()) {
        const filteredUsers = updatedUsers.filter((user: any) => user.email !== email);
        filteredUsers.push(updatedData);
        localStorage.setItem("users", JSON.stringify(filteredUsers));
      } else {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      navigate("/usermanagement");
    }
  };

  return (
    <div class="editdata-container">
      <Sidebar />
      <h1>Edit User Data</h1>
      {userData() ? (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username()} onInput={(e) => setUsername((e.target as HTMLInputElement).value)} />
          </label>
          <label>
            Email:
            <input type="email" value={newEmail()} onInput={(e) => setNewEmail((e.target as HTMLInputElement).value)} />
          </label>
          <label class="password-container">
            Password:
            <input type={showPassword() ? "text" : "password"} value={password()} onInput={(e) => setPassword((e.target as HTMLInputElement).value)} />
            <i class={`bx ${showPassword() ? "bx-show" : "bx-hide"}`} onClick={() => setShowPassword(!showPassword())}></i>
          </label>
          <label>
            Role:
            <select value={role()} onChange={(e) => setRole((e.target as HTMLSelectElement).value)}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
          <div class="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate("/usermanagement")} class="cancel">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditData;
