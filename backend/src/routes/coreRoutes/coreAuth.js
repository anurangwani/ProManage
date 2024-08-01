const express = require('express');
const router = express.Router();
const { catchErrors } = require('@/handlers/errorHandlers');
const adminAuth = require('@/controllers/coreControllers/adminAuth');
const register = require('@/controllers/middlewaresControllers/createAuthMiddleware/register');
const createAuthMiddleware =require('@/controllers/middlewaresControllers/createAuthMiddleware');
const userModel=require('@/models/coreModels/User')
const auth = createAuthMiddleware(userModel);

router.route('/login').post(catchErrors(adminAuth.login));
router.route('/forgetpassword').post(catchErrors(adminAuth.forgetPassword));
router.route('/resetpassword').post(catchErrors(adminAuth.resetPassword));
router.route('/logout').post(adminAuth.isValidAuthToken, catchErrors(adminAuth.logout));
router.route('/register').post(adminAuth.register); // Add this line for registration

module.exports = router;

