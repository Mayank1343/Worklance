import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjectById,
  updateProject,
} from "../../features/project/projectSlice";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import PageContainer from "../../components/ui/PageContainer";
import toast from "react-hot-toast";

const EditProject = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    selectedProject,
    isLoading,
  } = useAppSelector(
    (state) => state.project
  );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: "",
      skillsRequired: "",
    });

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        title:
          selectedProject.title || "",

        description:
          selectedProject.description || "",

        budget:
          selectedProject.budget || "",

        skillsRequired:
          selectedProject.skillsRequired?.join(
            ", "
          ) || "",
      });
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const projectData = {
        ...formData,

        skillsRequired:
          formData.skillsRequired
            .split(",")
            .map((skill) =>
              skill.trim()
            ),
      };

      const resultAction =
        await dispatch(
          updateProject({
            id,
            projectData,
          })
        );

      if (
        updateProject.fulfilled.match(
          resultAction
        )
      ) {
        toast.success(
          "Project updated successfully"
        );

        navigate(`/projects/${id}`);
      }
    };

  return (
    <PageContainer>

      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <p className="text-gray-500 mb-6">
        Update your project details and save changes.
      </p>

      <Card className="max-w-3xl mx-auto">
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
        <Input
            label="Project Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            />

        <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        />

        <Input
        label="Budget"
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        />

        <Input
        label="Skills Required"
        type="text"
        name="skillsRequired"
        value={formData.skillsRequired}
        onChange={handleChange}
        />

        <Button disabled={isLoading}>
        {isLoading
            ? "Updating..."
            : "Update Project"}
        </Button>

        </form>
        </Card>

    </PageContainer>
  );
};

export default EditProject;