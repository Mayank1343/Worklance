import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjects,
} from "../../features/project/projectSlice";

import { Link } from "react-router-dom";

const Projects = () => {
  const dispatch = useAppDispatch();

  const {
    projects,
    isLoading,
  } = useAppSelector(
    (state) => state.project
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {projects.map(
          (project) => (
            <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="block border rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold">
                {project.title}
              </h2>

              <p className="mt-2">
                {
                  project.description
                }
              </p>

              <p className="mt-3 font-semibold">
                Budget: $
                {project.budget}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                {project.skillsRequired?.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>
            </Link>
          )
        )}

      </div>

    </div>
  );
};



export default Projects;