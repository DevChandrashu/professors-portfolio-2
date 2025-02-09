// routes/portfolio-router.js

const express = require('express');
const router = express.Router();
const getPortfolio = require('../middlewares/getPortfolio-middleware');
const portfolioController = require('../controllers/admin-controller');

/**
 * Public Home Page
 * GET /
 * This route is accessible to logged-out users.
 */
router.get('/', portfolioController.home);

/**
 * Apply the getPortfolio middleware to all routes with a :username parameter.
 * This middleware will:
 *   - Check if a user with the given username exists.
 *   - Retrieve the user's portfolio data.
 *   - Attach that data to req.portfolio for use in the subsequent controller.
 */
router.use('/:username', getPortfolio-middleware);

/**
 * Public Portfolio for a Specific User
 * GET /:username
 * This route shows the full portfolio for the given username.
 */
router.get('/:username', portfolioController.getDashboard);

/**
 * Nested Route: User Projects
 * GET /:username/projects
 * This route displays only the projects for the given user.
 */
router.get('/:username/projects', portfolioController.getProjects);

/**
 * Nested Route: User Research Papers
 * GET /:username/research-papers
 * This route displays only the research papers for the given user.
 */
router.get('/:username/research-papers', portfolioController.getResearchPapers);

/**
 * Nested Route: User Blog Posts
 * GET /:username/blog-posts
 * This route displays only the blog posts for the given user.
 */
router.get('/:username/blog-posts', portfolioController.getBlogPosts);

module.exports = router;
