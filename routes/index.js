const express = require('express');

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movie');

const NotFoundError = require('../errors/NotFoundError');

const { validationSignIn, validationPostUser } = require('../middlewares/validatorsRequest/users');
const { signIn, postUser, signOut } = require('../controllers/users');

const router = express.Router();

router.post('/signup', validationPostUser, postUser);
router.post('/signin', validationSignIn, signIn);
router.post('/signout', auth, signOut);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Данный URL не существует')));

module.exports = router;
