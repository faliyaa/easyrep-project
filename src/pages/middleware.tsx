import { useNavigate } from "@solidjs/router";
import { createEffect, JSX } from "solid-js";

interface RequireAdminProps {
  children: JSX.Element;
}

const RequireAdmin = (props: RequireAdminProps) => {
  const navigate = useNavigate();

  createEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!user || user.role !== "Admin") {
      navigate("/landingpage");
    }
  });

  return props.children;
};

export default RequireAdmin;
