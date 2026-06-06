import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  createProject,
} from "../../features/project/projectSlice";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageContainer from "../../components/ui/PageContainer";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";

const CreateProject = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { isLoading } =
    useAppSelector(
      (state) => state.project
    );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: "",
      skillsRequired: "",
    });

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
          createProject(projectData)
        );

      if (
        createProject.fulfilled.match(
          resultAction
        )
      ) {
        navigate("/projects");
      }
    };

  return (
    <PageContainer>

      <h1 className="text-3xl font-bold mb-6">
        Create Project
      </h1>

      <Card className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Project Title"
          type="text"
          name="title"
          placeholder="Build a MERN Website"
          value={formData.title}
          onChange={handleChange}
        />

        <TextArea
          label="Description"
          name="description"
          placeholder="Describe your project requirements..."
          value={formData.description}
          onChange={handleChange}
        />

        <Input
          label="Budget"
          type="number"
          name="budget"
          placeholder="500"
          value={formData.budget}
          onChange={handleChange}
        />

        <Input
          label="Skills Required"
          type="text"
          name="skillsRequired"
          placeholder="React, Node.js, MongoDB"
          value={formData.skillsRequired}
          onChange={handleChange}
        />

        <Button disabled={isLoading}>
          {isLoading
            ? "Creating..."
            : "Create Project"}
        </Button>

      </form>
      </Card>
    </PageContainer>
  )
};

export default CreateProject;