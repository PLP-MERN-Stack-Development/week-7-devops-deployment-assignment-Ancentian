const { body } = require('express-validator');

exports.validatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),

  body('content')
    .notEmpty().withMessage('Content is required'),

  body('slug')
    .notEmpty().withMessage('Slug is required')
    .isSlug().withMessage('Slug must be a valid format'),

  body('excerpt')
    .optional()
    .isLength({ max: 200 }).withMessage('Excerpt must not exceed 200 characters'),

  body('featuredImage')
    .optional()
    .isString().withMessage('Featured image must be a string'),

  body('author')
    .notEmpty().withMessage('Author is required')
    .isMongoId().withMessage('Author must be a valid Mongo ID'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Category must be a valid Mongo ID'),

  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),

  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be true or false'),

  body('viewCount')
    .optional()
    .isInt({ min: 0 }).withMessage('View count must be a non-negative integer'),
];
