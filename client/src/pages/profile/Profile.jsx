import { useEffect, useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import EditProfile from "./EditProfile";

import {
  getProfile,
  updateProfile,
} from "../../features/profile/profileSlice";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { profile, isLoading } =
    useAppSelector((state) => state.profile);

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSave = async (
    formData
  ) => {
    await dispatch(
      updateProfile(formData)
    );

    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  if (!profile) {
    return (
      <h1 className="text-center mt-10">
        No Profile Found
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">

              <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl font-bold">
                {profile?.title?.charAt(0)}
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  {profile.title}
                </h1>

                <p className="text-blue-100 mt-2">
                  {profile.location}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setIsEditing(!isEditing)
              }
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
            >
              {isEditing
                ? "Cancel"
                : "Edit Profile"}
            </button>

          </div>

        </div>

        {/* Content */}
        <div className="p-8">

          {isEditing ? (

            <EditProfile
              profile={profile}
              onSave={handleSave}
            />

          ) : (

            <>
              {/* About */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">
                  About Me
                </h2>

                <p className="text-gray-700">
                  {profile.bio}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {profile.skills?.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-gray-100 rounded-xl p-4">
                  <h3 className="font-semibold">
                    Hourly Rate
                  </h3>

                  <p className="text-2xl font-bold text-green-600">
                    ${profile.hourlyRate}/hr
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <h3 className="font-semibold">
                    GitHub
                  </h3>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Visit
                  </a>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <h3 className="font-semibold">
                    LinkedIn
                  </h3>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Visit
                  </a>
                </div>

              </div>
            </>

          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;