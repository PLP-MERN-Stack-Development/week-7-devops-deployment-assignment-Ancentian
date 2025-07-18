// controllers/postController.js

const Post = require('../models/Post')

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.id })
   
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Get all published posts
exports.getPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .populate('author', 'name email')
      .populate('category', 'name')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get a single post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name email')
      .populate('category', 'name')
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await post.incrementViewCount()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get posts created by logged-in user
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 }) // Sort by creation date, most recent first
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    await post.addComment(req.user.id, req.body.content)
    res.status(201).json({ message: 'Comment added successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Update a post (by owner only)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' })
    }

    res.json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete a post (by owner only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' })
    }

    res.json({ message: 'Post deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
