import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectHeader from "./ProjectHeader";

function ViewAllProjects() {
  const [allProjects, setAllProjects] = useState([]);

  const getAllProjects = () => {
    axios.get(`http://localhost:5000/api/project`)
    .then((response) => {
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
