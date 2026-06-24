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
import toast from "react-hot-toast";

const CreateProject = () => {
  const dispatch =
    useAppDispatch();

  const navigate =
    useNavigate();

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
          createProject(
            projectData
          )
        );

      if (
        createProject.fulfilled.match(
          resultAction
        )
      ) {
        toast.success(
          "Project created successfully"
        );

        navigate("/projects");
      }
    };

  return (
    <PageContainer>

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >
            Create New Project
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Post a project and start
            receiving proposals from
            freelancers.
          </p>

        </div>

        {/* Form */}
        <Card
          className="
            p-8
            rounded-2xl
            shadow-sm
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
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
              label="Project Description"
              name="description"
              placeholder="Describe your project requirements..."
              value={
                formData.description
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="Budget (₹)"
              type="number"
              name="budget"
              placeholder="5000"
              value={
                formData.budget
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="Skills Required"
              type="text"
              name="skillsRequired"
              placeholder="React, Node.js, MongoDB"
              value={
                formData.skillsRequired
              }
              onChange={
                handleChange
              }
            />

            <div className="pt-2">

              <Button
                disabled={
                  isLoading
                }
              >
                {isLoading
                  ? "Creating..."
                  : "Create Project"}
              </Button>

            </div>

          </form>
        </Card>

      </div>

    </PageContainer>
  );
};

export default CreateProject;