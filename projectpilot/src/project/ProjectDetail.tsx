import { useEffect, useState } from "react";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import { useParams } from "react-router";

export default function ProjectDetail() {
  const [projectDetail, setProjectDetail] = useState<Project>();
  const params = useParams();
  const projectID: number = Number(params.id);

  useEffect(() => {
    function findProjectByID() {
      projectAPI
        .find(projectID)
        .then((data) => {
          setProjectDetail(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    findProjectByID();
  }, [projectID]);
  return (
    <div className="row">
      {projectDetail && (
        <div className="col-sm-6">
          <div className="card large">
            <img
              className="rounded"
              src={projectDetail.imageUrl}
              alt={projectDetail.name}
            />
            <section className="section dark">
              <h3 className="strong">
                <strong>{projectDetail.name}</strong>
              </h3>
              <p>{projectDetail.description}</p>
              <p>Budget : {projectDetail.budget}</p>

              <p>
                Signed: {projectDetail.contractSignedOn.toLocaleDateString()}
              </p>
              <p>
                <mark className="active">
                  {" "}
                  {projectDetail.isActive ? "active" : "inactive"}
                </mark>
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
