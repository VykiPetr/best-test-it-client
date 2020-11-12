import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectHeader from "./ProjectHeader";
import { API_URL } from "../config";
import './styles/ViewAllProjects.css'

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
    <div className="all-projects-body">
      <div className="all-projects-list">
        {allProjects.map((project, i) => {
          return <ProjectHeader className="project-header" project={project} key={i} />;
        })}
      </div>
    </div>
  );
}
export default ViewAllProjects;
