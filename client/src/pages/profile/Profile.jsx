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

import Loader from "../../components/ui/Loader";
import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { profile, isLoading } =
    useAppSelector(
      (state) => state.profile
    );

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
    return <Loader />;
  }

  if (!profile) {
    return (
      <PageContainer>
        <Card>
          No Profile Found
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      <div className="max-w-6xl mx-auto">

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            rounded-3xl
            p-8
            text-white
            shadow-lg
          "
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-6">

              <div
                className="
                  h-24
                  w-24
                  rounded-full
                  bg-white
                  text-blue-700
                  flex
                  items-center
                  justify-center
                  text-4xl
                  font-bold
                "
              >
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
                setIsEditing(
                  !isEditing
                )
              }
              className="
                bg-white
                text-blue-700
                px-5
                py-3
                rounded-xl
                font-semibold
                hover:bg-gray-100
                transition
              "
            >
              {isEditing
                ? "Cancel"
                : "Edit Profile"}
            </button>

          </div>
        </div>

        <div className="mt-8">

          {isEditing ? (

            <Card className="p-8">
              <EditProfile
                profile={profile}
                onSave={handleSave}
              />
            </Card>

          ) : (

            <div className="space-y-6">

              <Card className="p-8">

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >
                  About Me
                </h2>

                <p
                  className="
                    text-gray-700
                    leading-relaxed
                  "
                >
                  {profile.bio}
                </p>

              </Card>

              <Card className="p-8">

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >
                  Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {profile.skills?.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="
                          bg-blue-100
                          text-blue-700
                          px-4
                          py-2
                          rounded-full
                          font-medium
                        "
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </Card>

              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-6
                "
              >

                <Card className="p-6">

                  <h3
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    Hourly Rate
                  </h3>

                  <p
                    className="
                      text-3xl
                      font-bold
                      text-green-600
                      mt-2
                    "
                  >
                    ${profile.hourlyRate}/hr
                  </p>

                </Card>

                <Card className="p-6">

                  <h3
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    GitHub
                  </h3>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-blue-600
                      font-medium
                      hover:underline
                    "
                  >
                    Visit Profile
                  </a>

                </Card>

                <Card className="p-6">

                  <h3
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    LinkedIn
                  </h3>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-blue-600
                      font-medium
                      hover:underline
                    "
                  >
                    Visit Profile
                  </a>

                </Card>

              </div>

            </div>

          )}

        </div>

      </div>

    </PageContainer>
  );
};

export default Profile;