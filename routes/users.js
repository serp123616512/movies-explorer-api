const express = require('express');

const { validationPatchUser } = require('../middlewares/validatorsRequest/users');

const {
  getUser,
  patchUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', validationPatchUser, patchUser);

module.exports = userRouter;
