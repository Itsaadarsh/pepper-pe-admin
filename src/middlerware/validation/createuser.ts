import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('email').isEmail().withMessage('Incorrect EMAIL format'),
    body('name').trim().blacklist(' '),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 - 30 characters'),
  ];
};
