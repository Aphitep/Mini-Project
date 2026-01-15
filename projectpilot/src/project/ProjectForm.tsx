import React, { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onCancle: () => void;
  onSave: (project: Project) => void;
}

type Errors = {
  name: string;
  description: string;
  budget: string;
};

function ProjecthtmlForm({
  project: initailProject,
  onSave,
  onCancle,
}: ProjectFormProps) {
  const [project, setProject] = useState(initailProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { type, name, value, checked } = e.target as HTMLInputElement;
    let updatedValue: unknown = type === "checkbox" ? checked : value;
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    const errors: Errors = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is require.";
    }

    if (project.name.length > 0 && project.name.length <= 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }

    if (project.description.length === 0) {
      errors.description = "Description is require.";
    }

    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }

    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        value={project.name}
        onChange={handleChange}
        name="name"
        placeholder="enter name"
      />
      {errors.name && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="enter description"
      ></textarea>
      <label htmlFor="budget">Project Budget</label>
      {errors.description && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <input
        type="number"
        value={project.budget}
        onChange={handleChange}
        name="budget"
        placeholder="enter budget"
      />
      {errors.budget && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        checked={project.isActive}
        onChange={handleChange}
        name="isActive"
      />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button type="button" onClick={onCancle} className="bordered medium">
          cancel
        </button>
      </div>
    </form>
  );
}
export default ProjecthtmlForm;
