import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjects,
} from "../../features/project/projectSlice";

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import Loader from "../../components/ui/Loader";

const Projects = () => {
  const dispatch =
    useAppDispatch();

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
    return <Loader />;
  }

  if (
    !isLoading &&
    projects.length === 0
  ) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first project
            to get started.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <p className="text-gray-500 mt-2">
          Browse available projects
          and opportunities.
        </p>
      </div>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {projects.map(
          (project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
            >
              <Card
                className="
                  h-full
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                <div className="flex justify-between items-start">

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    {project.title}
                  </h2>

                  <span
                    className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                    "
                  >
                    {project.status}
                  </span>

                </div>

                <p
                  className="
                    mt-4
                    text-gray-600
                    line-clamp-3
                  "
                >
                  {project.description}
                </p>

                <p
                  className="
                    mt-5
                    text-2xl
                    font-bold
                    text-blue-600
                  "
                >
                  ₹{project.budget}
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mt-5
                  "
                >
                  {project.skillsRequired?.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="
                          bg-blue-100
                          text-blue-700
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                        "
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

              </Card>
            </Link>
          )
        )}
      </div>

    </PageContainer>
  );
};

export default Projects;