import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjecthtmlForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const handleCancle = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map((project) => {
    return (
      <div key={project.id}>
        {projectBeingEdited && project === projectBeingEdited ? (
          <ProjecthtmlForm
            onSave={onSave}
            onCancle={handleCancle}
            project={project}
          />
        ) : (
          <ProjectCard project={project} onEdit={handleEdit} />
        )}
      </div>
    );
  });

  return <ul className="row">{items}</ul>;
}

export default ProjectList;
