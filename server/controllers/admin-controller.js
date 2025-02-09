// controllers/admin-controller.js

const About = require('../models/about-model');
const Project = require('../models/project-model');
const ResearchPaper = require('../models/researchPaper-model');
const Conference = require('../models/conference-model');
const Achievement = require('../models/achievement-model');
const BlogPost = require('../models/blogPost-model');
const TeachingExperience = require('../models/teachingExperience-model');
const Award = require('../models/award-model');
const Collaboration = require('../models/collaboration-model');

exports.home = async(req,res) => {
  try {
      res
      .status(200)
      .send('Hello world');
  } catch (error) {
      console.log(error)
  }
};

exports.getDashboard = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.portfolio
    // console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(` error from admin route ${error}`);
  }
};

/**
 * ---------------------
 * ABOUT (Professor Info)
 * ---------------------
 */

// Get the About information for the logged-in user
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne({ user: req.user.id });
    return res.json(about);
  } catch (error) {
    console.error('Error fetching About:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create or update the About information (assuming one record per user)
exports.createOrUpdateAbout = async (req, res) => {
  try {
    let about = await About.findOne({ user: req.user.id });
    if (about) {
      // Update existing record
      about = await About.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true }
      );
    } else {
      // Create new record
      req.body.user = req.user.id;
      about = await About.create(req.body);
    }
    return res.json(about);
  } catch (error) {
    console.error('Error creating/updating About:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * PROJECTS
 * ----------------
 */

// Create a new project
exports.createProject = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects for the logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    return res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a project by ID (only if it belongs to the user)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project by ID (only if it belongs to the user)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * RESEARCH PAPERS
 * ----------------
 */

// Create a new research paper
exports.createResearchPaper = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const paper = await ResearchPaper.create(req.body);
    return res.status(201).json(paper);
  } catch (error) {
    console.error('Error creating research paper:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all research papers for the logged-in user
exports.getResearchPapers = async (req, res) => {
  try {
    const papers = await ResearchPaper.find({ user: req.user.id });
    return res.json(papers);
  } catch (error) {
    console.error('Error fetching research papers:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a research paper by ID
exports.updateResearchPaper = async (req, res) => {
  try {
    const paper = await ResearchPaper.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }
    return res.json(paper);
  } catch (error) {
    console.error('Error updating research paper:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a research paper by ID
exports.deleteResearchPaper = async (req, res) => {
  try {
    const paper = await ResearchPaper.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }
    return res.json({ message: 'Research paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting research paper:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * CONFERENCES
 * ----------------
 */

// Create a new conference
exports.createConference = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const conference = await Conference.create(req.body);
    return res.status(201).json(conference);
  } catch (error) {
    console.error('Error creating conference:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all conferences for the logged-in user
exports.getConferences = async (req, res) => {
  try {
    const conferences = await Conference.find({ user: req.user.id });
    return res.json(conferences);
  } catch (error) {
    console.error('Error fetching conferences:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a conference by ID
exports.updateConference = async (req, res) => {
  try {
    const conference = await Conference.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!conference) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    return res.json(conference);
  } catch (error) {
    console.error('Error updating conference:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a conference by ID
exports.deleteConference = async (req, res) => {
  try {
    const conference = await Conference.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!conference) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    return res.json({ message: 'Conference deleted successfully' });
  } catch (error) {
    console.error('Error deleting conference:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * ACHIEVEMENTS
 * ----------------
 */

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const achievement = await Achievement.create(req.body);
    return res.status(201).json(achievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all achievements for the logged-in user
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user.id });
    return res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an achievement by ID
exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    return res.json(achievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete an achievement by ID
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    return res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * BLOG POSTS
 * ----------------
 */

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const blogPost = await BlogPost.create(req.body);
    return res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all blog posts for the logged-in user
exports.getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({ user: req.user.id });
    return res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a blog post by ID
exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    return res.json(blogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a blog post by ID
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    return res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * TEACHING EXPERIENCES
 * ----------------
 */

// Create a new teaching experience entry
exports.createTeachingExperience = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const teachingExperience = await TeachingExperience.create(req.body);
    return res.status(201).json(teachingExperience);
  } catch (error) {
    console.error('Error creating teaching experience:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all teaching experiences for the logged-in user
exports.getTeachingExperiences = async (req, res) => {
  try {
    const experiences = await TeachingExperience.find({ user: req.user.id });
    return res.json(experiences);
  } catch (error) {
    console.error('Error fetching teaching experiences:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a teaching experience by ID
exports.updateTeachingExperience = async (req, res) => {
  try {
    const experience = await TeachingExperience.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ message: 'Teaching experience not found' });
    }
    return res.json(experience);
  } catch (error) {
    console.error('Error updating teaching experience:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a teaching experience by ID
exports.deleteTeachingExperience = async (req, res) => {
  try {
    const experience = await TeachingExperience.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!experience) {
      return res.status(404).json({ message: 'Teaching experience not found' });
    }
    return res.json({ message: 'Teaching experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting teaching experience:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * AWARDS
 * ----------------
 */

// Create a new award entry
exports.createAward = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const award = await Award.create(req.body);
    return res.status(201).json(award);
  } catch (error) {
    console.error('Error creating award:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all awards for the logged-in user
exports.getAwards = async (req, res) => {
  try {
    const awards = await Award.find({ user: req.user.id });
    return res.json(awards);
  } catch (error) {
    console.error('Error fetching awards:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an award by ID
exports.updateAward = async (req, res) => {
  try {
    const award = await Award.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    return res.json(award);
  } catch (error) {
    console.error('Error updating award:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete an award by ID
exports.deleteAward = async (req, res) => {
  try {
    const award = await Award.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    return res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.error('Error deleting award:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ----------------
 * COLLABORATIONS
 * ----------------
 */

// Create a new collaboration entry
exports.createCollaboration = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const collaboration = await Collaboration.create(req.body);
    return res.status(201).json(collaboration);
  } catch (error) {
    console.error('Error creating collaboration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all collaborations for the logged-in user
exports.getCollaborations = async (req, res) => {
  try {
    const collaborations = await Collaboration.find({ user: req.user.id });
    return res.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a collaboration by ID
exports.updateCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }
    return res.json(collaboration);
  } catch (error) {
    console.error('Error updating collaboration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a collaboration by ID
exports.deleteCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }
    return res.json({ message: 'Collaboration deleted successfully' });
  } catch (error) {
    console.error('Error deleting collaboration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
