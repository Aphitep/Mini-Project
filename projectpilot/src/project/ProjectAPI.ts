import { Project } from "./Project";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

interface ProjectData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number;
  contractSignedOn: string;
  budget: number;
  isActive: boolean;
}

function translateStatusToErrorsMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorsMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function delay(ms: number) {
  return function <T>(x: T): Promise<T> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(x);
      }, ms)
    );
  };
}

function convertToProjectModels(data: ProjectData[]): Project[] {
  const projects: Project[] = data.map(converToProjectModel);
  return projects;
}

function converToProjectModel(item: ProjectData): Project {
  return new Project(item);
}

const projectAPI = {
  get(page = 1, limit = 20): Promise<Project[]> {
    return fetch(`${url}?page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log("log client error" + error);
        throw new Error(
          "There was an error retrieving the projects. Please try again."
        );
      });
  },
  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error" + error);
        throw new Error(
          "There was an error update the projects. Please try again."
        );
      });
  },
  find(id: number): Promise<Project> {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(converToProjectModel);
  },
};
export { projectAPI };
