import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  client_id: number;
  due_date: string; // pakai string supaya lebih aman dari API
  status: string;
}

interface ProjectData {
  data: Project[];
}

const fetchProjectList = async () => {
  return await axios.get<ProjectData>("/project");
};

const ProjectSkeleton = () => {
  return (
    <div className="group relative p-4 bg-gray-100 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
};

const ProjectList = () => {
  const getProjectList = useQuery({ queryKey: ["projectList"], queryFn: fetchProjectList });
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("/project/add")}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">List of Projects</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {getProjectList.isFetching ? (
              Array.from({ length: 4 }).map((_, index) => <ProjectSkeleton key={index} />)
            ) : (
              getProjectList.data?.data.map((project) => (
                <div
                  key={project.id}
                  className="group relative p-4 border rounded-lg hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Status: {project.status}</p>
                  <p className="text-sm text-gray-400">Due: {new Date(project.due_date).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
