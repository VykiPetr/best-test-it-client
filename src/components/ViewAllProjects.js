import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectHeader from "./ProjectHeader";
import { API_URL } from "../config";


function ViewAllProjects() {
  const [allProjects, setAllProjects] = useState([]);

  const getAllProjects = () => {
    axios.get(`${API_URL}/project`).then((response) => {
      setAllProjects(response.data);
    });
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <div>
      {allProjects.map((project, i) => {
        return <ProjectHeader project={project} key={i} />;
      })}
    </div>
  );
}
export default ViewAllProjects;
