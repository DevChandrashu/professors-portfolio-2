// middlewares/getPortfolio.js

const User = require('../models/user-model');
const About = require('../models/about-model');
const Project = require('../models/project-model');
const ResearchPaper = require('../models/researchPaper-model');
const Conference = require('../models/conference-model');
const Achievement = require('../models/achievement-model');
const BlogPost = require('../models/blogPost-model');
const TeachingExperience = require('../models/teachingExperience-model');
const Award = require('../models/award-model');
const Collaboration = require('../models/collaboration-model');

const getPortfolio = async (req, res, next) => {
  try {
    // Assume the portfolio owner's ID is provided as a URL parameter (e.g., /user/:userId)
    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Retrieve portfolio data for the user
    const about = await About.findOne({ user: userId });
    const projects = await Project.find({ user: userId });
    const researchPapers = await ResearchPaper.find({ user: userId });
    const conferences = await Conference.find({ user: userId });
    const achievements = await Achievement.find({ user: userId });
    const blogPosts = await BlogPost.find({ user: userId });
    const teachingExperiences = await TeachingExperience.find({ user: userId });
    const awards = await Award.find({ user: userId });
    const collaborations = await Collaboration.find({ user: userId });

    // Attach the collected data to req.portfolio
    req.portfolio = {
      user,
      about,
      projects,
      researchPapers,
      conferences,
      achievements,
      blogPosts,
      teachingExperiences,
      awards,
      collaborations,
    };

    // Pass control to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in getPortfolio middleware:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving portfolio data." });
  }
};

module.exports = getPortfolio;
