const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :username from parent route
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');

// 1. Protect all routes with the auth middleware.
router.use(authMiddleware);

// 2. Verify that the logged-in user's username matches the username in the URL.
router.use((req, res, next) => {
  // Assume that the User model stored the username in req.user.username when the token was generated.
  if (req.user.username !== req.params.username) {
    return res.status(403).json({ message: 'Forbidden: You cannot access another user\'s admin panel.' });
  }
  next();
});

// 3. Define routes

// GET /user/:username/admin/
// Display the full admin dashboard (all portfolio info for the user)
router.get('/', adminController.getDashboard);

// ----- ABOUT (Professor Info) -----
// GET /user/:username/admin/about - Retrieve About information.
router.route('/about')
  .get(adminController.getAbout)
  // POST /user/:username/admin/about - Create or update About information.
  .post(adminController.createOrUpdateAbout);

// ----- PROJECTS -----
// GET /user/:username/admin/projects - List all projects.
router.route('/projects')
  .get(adminController.getProjects)
  // POST /user/:username/admin/projects - Create a new project.
  .post(adminController.createProject);

// PUT and DELETE for a specific project by its id.
router.route('/projects/:id')
  .put(adminController.updateProject)
  .delete(adminController.deleteProject);

// ----- RESEARCH PAPERS -----
// GET /user/:username/admin/research-papers - List all research papers.
router.route('/research-papers')
  .get(adminController.getResearchPapers)
  // POST /user/:username/admin/research-papers - Create a new research paper.
  .post(adminController.createResearchPaper);

router.route('/research-papers/:id')
  .put(adminController.updateResearchPaper)
  .delete(adminController.deleteResearchPaper);

// ----- CONFERENCES -----
router.route('/conferences')
  .get(adminController.getConferences)
  .post(adminController.createConference);

router.route('/conferences/:id')
  .put(adminController.updateConference)
  .delete(adminController.deleteConference);

// ----- ACHIEVEMENTS -----
router.route('/achievements')
  .get(adminController.getAchievements)
  .post(adminController.createAchievement);

router.route('/achievements/:id')
  .put(adminController.updateAchievement)
  .delete(adminController.deleteAchievement);

// ----- BLOG POSTS -----
router.route('/blog-posts')
  .get(adminController.getBlogPosts)
  .post(adminController.createBlogPost);

router.route('/blog-posts/:id')
  .put(adminController.updateBlogPost)
  .delete(adminController.deleteBlogPost);

// ----- TEACHING EXPERIENCES -----
router.route('/teaching-experiences')
  .get(adminController.getTeachingExperiences)
  .post(adminController.createTeachingExperience);

router.route('/teaching-experiences/:id')
  .put(adminController.updateTeachingExperience)
  .delete(adminController.deleteTeachingExperience);

// ----- AWARDS -----
router.route('/awards')
  .get(adminController.getAwards)
  .post(adminController.createAward);

router.route('/awards/:id')
  .put(adminController.updateAward)
  .delete(adminController.deleteAward);

// ----- COLLABORATIONS -----
router.route('/collaborations')
  .get(adminController.getCollaborations)
  .post(adminController.createCollaboration);

router.route('/collaborations/:id')
  .put(adminController.updateCollaboration)
  .delete(adminController.deleteCollaboration);

module.exports = router;
