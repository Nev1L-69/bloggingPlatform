const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create a new blog post
router.post('/blogs', async (req, res) => {
    try {
      const { title, body, author } = req.body;
      const blog = new Blog({ title, body, author });
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Retrieve all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a blog post by ID
router.put('/blogs/:id', async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post by ID
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;