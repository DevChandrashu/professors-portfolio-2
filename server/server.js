require("dotenv").config();
const express  = require("express");
const cors = require("cors")
const app = express();
const connectDb = require("./utils/db")

//handling cors

app.use(cors({ origin: "*", methods: "GET, POST, PUT, DELETE, PATCH, HEAD", credentials: true }));


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); 

const authRouter = require('./routes/auth-router');
const portfolioRouter = require('./routes/portfolio-router');
const adminRouter = require('./routes/admin-router');
const errorMiddleware = require("./middlewares/error-middleware");

// Authentication routes (e.g., register, login, user profile)
app.use('/api/auth', authRouter);

// Public Portfolio Routes:
// The portfolio router handles the home page as well as dynamic routes for a user’s portfolio.
// For example:
//   GET  /             → Home page for logged-out users.
//   GET  /:username    → Public portfolio for a specific user.
//   GET  /:username/projects  → Projects for a specific user, etc.
app.use('/api/', portfolioRouter);

// Admin Routes:
// Nested admin routes are mounted under /user/:username/admin.
// These routes are protected by auth middleware and allow a user to manage their own portfolio.
app.use('/api/:username/admin', adminRouter);

app.use(errorMiddleware)

const PORT = 5002;

connectDb().then(()=> {
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    })
})
