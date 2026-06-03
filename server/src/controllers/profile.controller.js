import Profile from "../models/profile.model.js";


// GET PROFILE
export const getProfile = async (
  req,
  res,
  next
) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};


// CREATE / UPDATE PROFILE
export const upsertProfile = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      bio,
      skills,
      hourlyRate,
      location,
      github,
      linkedin,
      portfolioWebsite,
    } = req.body;

    let profile =
      await Profile.findOne({
        user: req.user._id,
      });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },

        {
          title,
          bio,
          skills,
          hourlyRate,
          location,
          github,
          linkedin,
          portfolioWebsite,
        },

        {
          new: true,
        }
      );
    } else {
      profile = await Profile.create({
        user: req.user._id,

        title,
        bio,
        skills,
        hourlyRate,
        location,
        github,
        linkedin,
        portfolioWebsite,
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};