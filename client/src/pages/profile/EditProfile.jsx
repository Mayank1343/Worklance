import { useState } from "react";

const EditProfile = ({
  profile,
  onSave,
}) => {
  const [formData, setFormData] =
    useState({
      title: profile?.title || "",
      bio: profile?.bio || "",
      location:
        profile?.location || "",
      hourlyRate:
        profile?.hourlyRate || "",
      github:
        profile?.github || "",
      linkedin:
        profile?.linkedin || "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-3 rounded"
      />

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="w-full border p-3 rounded"
      />

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border p-3 rounded"
      />

      <input
        name="hourlyRate"
        value={formData.hourlyRate}
        onChange={handleChange}
        placeholder="Hourly Rate"
        className="w-full border p-3 rounded"
      />

      <input
        name="github"
        value={formData.github}
        onChange={handleChange}
        placeholder="Github URL"
        className="w-full border p-3 rounded"
      />

      <input
        name="linkedin"
        value={formData.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="w-full border p-3 rounded"
      />

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default EditProfile;