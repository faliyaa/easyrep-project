import type { Component } from "solid-js";
import GridComponent from "./GridComponent";
import './gridpage.css'

const GridPage: Component = () => {
  return (
    <div>
      <h1>User List</h1>
      <GridComponent />
    </div>
  );
};

export default GridPage;
