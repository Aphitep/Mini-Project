import { Link } from "react-router";
import { Project } from "./Project";

interface ProjectData {
  project: Project;
  onEdit: (project: Project) => void;
}

function formatDescription(description: string) {
  return description.substring(0, 60) + "...";
}

function ProjectCard(projectData: ProjectData) {
  const { project, onEdit } = projectData;
  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };

  return (
    <div key={project.id} className="cols-sm">
      <div className="card">
        <img src={project.imageUrl} alt="project name" />
        <section className="section dark">
          <Link to={"/project/" + project.id}>
            <h5 className="strong">
              <strong>{project.name}</strong>
            </h5>
          </Link>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
          <button
            onClick={() => {
              handleEditClick(project);
            }}
            className="bordered"
          >
            <span className="icon-edit"></span>
            Edit
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProjectCard;
