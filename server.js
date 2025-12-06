// WEB322 – Assignment 2
// Student Name: YI-LIEN HSIEH
// Student ID  : 105889240
// Date        : 12-06-2025
// Section     : WEB322 NAA
//Published URL: https://web322-assignment2-puce.vercel.app

const express = require('express');
const path = require('path');  
const projectData = require('./modules/projects');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/solutions/projects', (req, res) => {
  if (req.query.sector) {
    projectData.getProjectsBySector(req.query.sector)
      .then(projects => {
        if (projects.length > 0) {
          res.render('projects', { projects: projects });
        } else {
          res.status(404).render('404', { 
            message: `No projects found for sector: ${req.query.sector}` 
          });
        }
      })
      .catch(err => {
        res.status(404).render('404', { message: err });
      });
  } else {
    projectData.getAllProjects()
      .then(projects => {
        res.render('projects', { projects: projects });
      })
      .catch(err => {
        res.status(404).render('404', { message: err });
      });
  }
});

app.get('/solutions/projects/:id', (req, res) => {
  projectData.getProjectById(req.params.id)
    .then(project => {
      res.render('project', { project: project });
    })
    .catch(err => {
      res.status(404).render('404', { message: err });
    });
});

app.use((req, res) => {
  res.status(404).render('404', { 
    message: "I'm sorry, we're unable to find what you're looking for" 
  });
});

projectData.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize data:', err);
  });
