const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const router = express.Router();

const {
  createPost,
  getPublishedPosts,
  getPostBySlug,
  getMyPosts,
  addComment,
  updatePost,
  deletePost
} = require('../controllers/postController')


// Create a new post (authenticated users)
router.post('/create', protect, createPost)

router.get('/get-my-posts', protect, getMyPosts)
router.get('/published', getPublishedPosts)
router.get('/:slug', getPostBySlug)
router.post('/:postId/comments', protect, addComment)

router.put('/:id', protect, updatePost)

router.delete('/:id', protect, deletePost)

module.exports = router
