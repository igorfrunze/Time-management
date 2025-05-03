const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { limit = 6, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const projects = await Project.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await Project.countDocuments({ userId: req.params.userId });
    
    res.json({
      projects,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading projects' });
  }
});

router.post('/', async (req, res) => {
  const { userId, name, content } = req.body;

  try {
    const newProject = new Project({ userId, name, content });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if(!project) {
      return res.status(404).json({message: 'Project not found'})
    } else {
      return res.json(project)
    }
  } catch (error) {
    res.status(500).json({message: 'Error fetching project'})
  }
})

router.put('/project/:id', async (req, res) => {
  const {name, content} = req.body;
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {name, content},
      {new: true}
    )
    res.json(updated)
  } catch (error) {
    res.status(500).json({message: "Error updating project"})
  }
})

router.delete('/project/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router;
