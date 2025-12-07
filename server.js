// *********************************************************************************
// * WEB322 – Assignment 2
// * I declare that this assignment is my own work in accordance with Seneca's
// * Name: YI-LIEN HSIEH
// * Student ID: 105889240
// * Date: 10-31-2025
// * Section: WEB322 NAA
// * Published URL:
// *********************************************************************************

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  if (sector) {
    projectData
      .getProjectsBySector(sector)
      .then((projects) => {
        res.render("projects", { projects, sector });
      })
      .catch((err) => {
        res.status(404).render("404", {
          message: `No projects found for sector: ${sector}`,
        });
      });
  } else {
    projectData.getAllProjects().then((projects) => {
      res.render("projects", { projects, sector: null });
    });
  }
});

app.get("/solutions/projects/:id", (req, res) => {
  projectData
    .getProjectById(req.params.id)
    .then((project) => {
      res.render("project", { project });
    })
    .catch((err) => {
      res.status(404).render("404", { message: err });
    });
});

app.use((req, res) => {
  res.status(404).render("404", {
    message: "I'm sorry, we're unable to find what you're looking for.",
  });
});

projectData
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data:", err);
  });
