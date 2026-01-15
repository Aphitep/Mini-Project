import { useEffect, useState } from "react";

import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";

import ProjectList from "./ProjectList";

function ProjectPage() {
  const [projects, setProjecs] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if (currentPage === 1) {
          setProjecs(data);
        } else {
          setProjecs((projects) => [...projects, ...data]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrors(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [currentPage]);

  const handlePage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        const updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjecs(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setErrors(e.message);
        }
      });
  };
  return (
    <>
      <h1>Projects</h1>
      {errors && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {errors}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList onSave={saveProject} projects={projects} />
      {!loading && !errors && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handlePage}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
export default ProjectPage;
