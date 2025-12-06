// WEB322 – Assignment 2
// Student Name: YI-LIEN HSIEH
// Student ID  : 105889240
// Date        : 12-06-2025
// Section     : WEB322 NAA

const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];
      projectData.forEach(p => {
        const s = sectorData.find(sec => sec.id === p.sector_id);
        projects.push({ ...p, sector: s ? s.sector_name : "Unknown" });
      });
      resolve();
    } catch (err) {
      reject("failed to init");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve) => {
    resolve(projects);
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const idNum = Number(projectId);
    const proj = projects.find(p => p.id === idNum);
    if (proj) {
      resolve(proj);
    } else {
      reject("project not found");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const key = String(sector).toLowerCase();
    const list = projects.filter(p =>
      String(p.sector).toLowerCase().includes(key)
    );
    if (list.length > 0) {
      resolve(list);
    } else {
      reject("projects not found");
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};