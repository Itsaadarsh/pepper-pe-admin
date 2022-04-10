import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('admin_id').isLength({ min: 4, max: 4 }).withMessage('Invalid Admin ID'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 - 30 characters'),
  ];
};
