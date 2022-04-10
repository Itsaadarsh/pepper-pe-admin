import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('account_number').isLength({ min: 16, max: 16 }).withMessage('Incorrect Account Number'),
    body('remarks').toUpperCase(),
    body('amount').isNumeric().withMessage('Amount should be an integer'),
  ];
};
