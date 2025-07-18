const { body } = require('express-validator');

exports.validateCategory = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 50 }).withMessage('Category name cannot exceed 50 characters'),

  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
];
