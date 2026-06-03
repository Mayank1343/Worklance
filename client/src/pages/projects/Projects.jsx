import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjects,
} from "../../features/project/projectSlice";

import { Link } from "react-router-dom";

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import Loader from "../../components/ui/Loader";

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
  return <Loader />;
  }

  if (!isLoading && projects.length === 0) {
  return (
    <PageContainer>
      <div className="text-center py-16">

        <h2 className="text-2xl font-semibold">
          No Projects Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first project to get started.
        </p>

      </div>
    </PageContainer>
  );
}

  return (
    <PageContainer>

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {projects.map((project) => (
            <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="block"
            >
                <Card>

                    <div className="flex justify-between items-start">

                        <h2 className="text-xl font-bold">
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
                            font-medium
                        "
                        >
                        OPEN
                        </span>

                    </div>

                    <p className="mt-3 text-gray-600">
                        {project.description}
                    </p>

                    <p className="mt-4 text-lg font-semibold">
                        ₹ {project.budget}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">

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
                                text-sm
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