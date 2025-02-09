// src/pages/Portfolio.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import dummyPortfolio from "../data/dummyPortfolio.json";

const Portfolio = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}`)
      .then((res) => {
        // Assume the backend returns an object with a key "userData"
        console.log("API response:", res.data);
        setPortfolio(res.data.userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching portfolio:", err);
        if (err.response && err.response.status === 404) {
          navigate("/404");
        } else {
          setLoading(false);
        }
      });
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  // If portfolio data exists, use it, but for each section use an empty fallback
  // if the user has modified any part (i.e. portfolio is not null).
  // Otherwise, use the dummyPortfolio.
  const displayPortfolio = portfolio ? {
    user: { ...portfolio.user, profilePic: "/images/default-profile.png" },
    about: portfolio.about && portfolio.about.biography
      ? portfolio.about
      : { biography: "" },
    projects: portfolio.projects && portfolio.projects.length > 0
      ? portfolio.projects
      : [],
    researchPapers: portfolio.researchPapers && portfolio.researchPapers.length > 0
      ? portfolio.researchPapers
      : [],
    conferences: portfolio.conferences && portfolio.conferences.length > 0
      ? portfolio.conferences
      : [],
    achievements: portfolio.achievements && portfolio.achievements.length > 0
      ? portfolio.achievements
      : [],
    blogPosts: portfolio.blogPosts && portfolio.blogPosts.length > 0
      ? portfolio.blogPosts
      : [],
    teachingExperiences: portfolio.teachingExperiences && portfolio.teachingExperiences.length > 0
      ? portfolio.teachingExperiences
      : [],
    awards: portfolio.awards && portfolio.awards.length > 0
      ? portfolio.awards
      : [],
    collaborations: portfolio.collaborations && portfolio.collaborations.length > 0
      ? portfolio.collaborations
      : []
  } : dummyPortfolio;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-16">
      {/* About Section */}
      <section className="bg-indigo-50 rounded-2xl p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={displayPortfolio.user.profilePic}
            alt="Profile"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg ring-4 ring-white ring-opacity-75"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {displayPortfolio.user.username}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {displayPortfolio.about.biography || ""}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Projects
        </h2>
        {displayPortfolio.projects.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPortfolio.projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No projects available.
          </p>
        )}
      </section>

      {/* Research Papers Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Research Papers
        </h2>
        {displayPortfolio.researchPapers.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {displayPortfolio.researchPapers.map((paper) => (
              <div
                key={paper._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {paper.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {paper.abstract}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No research papers available.
          </p>
        )}
      </section>

      {/* Conferences Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Conferences
        </h2>
        {displayPortfolio.conferences.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPortfolio.conferences.map((conf) => (
              <div
                key={conf._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {conf.name}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">{conf.location}</span> - {conf.date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No conferences available.
          </p>
        )}
      </section>

      {/* Achievements Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Achievements
        </h2>
        {displayPortfolio.achievements.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {displayPortfolio.achievements.map((ach) => (
              <div
                key={ach._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {ach.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No achievements available.
          </p>
        )}
      </section>

      {/* Blog Posts Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Blog Posts
        </h2>
        {displayPortfolio.blogPosts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {displayPortfolio.blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No blog posts available.
          </p>
        )}
      </section>

      {/* Teaching Experience Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Teaching Experience
        </h2>
        {displayPortfolio.teachingExperiences.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {displayPortfolio.teachingExperiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {exp.institution}
                </h3>
                <p className="text-gray-600">{exp.courseTitle}</p>
                {exp.startDate && exp.endDate && (
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No teaching experience available.
          </p>
        )}
      </section>

      {/* Awards Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Awards
        </h2>
        {displayPortfolio.awards.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPortfolio.awards.map((award) => (
              <div
                key={award._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {award.title}
                </h3>
                <p className="text-gray-600">{award.description}</p>
                {award.awardingInstitution && (
                  <p className="text-sm text-gray-500">{award.awardingInstitution}</p>
                )}
                {award.dateAwarded && (
                  <p className="text-sm text-gray-500">
                    {new Date(award.dateAwarded).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No awards available.
          </p>
        )}
      </section>

      {/* Collaborations Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-l-4 border-indigo-500 pl-4">
          Collaborations
        </h2>
        {displayPortfolio.collaborations.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {displayPortfolio.collaborations.map((collab) => (
              <div
                key={collab._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-200 hover:border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {collab.projectTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed">{collab.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
            No collaborations available.
          </p>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
