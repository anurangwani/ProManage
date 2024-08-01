const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();
const adminController = require('@/controllers/coreControllers/adminController');
const settingController = require('@/controllers/coreControllers/settingController');
const emailController = require('@/controllers/coreControllers/emailController');
const { singleStorageUpload } = require('@/middlewares/uploadMiddleware');
const { register } = require('@/controllers/middlewaresControllers/createAuthMiddleware/register'); // Assuming authController handles user registration

// _______________________________ Admin management _______________________________

router.route('/admin/read/:id').get(catchErrors(adminController.read));
router.route('/admin/password-update/:id').patch(catchErrors(adminController.updatePassword));

// _______________________________ Admin Profile _______________________________

router.route('/admin/profile/password').patch(catchErrors(adminController.updateProfilePassword));
router
  .route('/admin/profile/update')
  .patch(
    singleStorageUpload({ entity: 'admin', fieldName: 'photo', fileType: 'image' }),
    catchErrors(adminController.updateProfile)
  );

// _______________________________ API for Global Setting _______________________________

router.route('/setting/create').post(catchErrors(settingController.create));
router.route('/setting/read/:id').get(catchErrors(settingController.read));
router.route('/setting/update/:id').patch(catchErrors(settingController.update));
router.route('/setting/delete/:id').delete(catchErrors(settingController.delete));
router.route('/setting/search').get(catchErrors(settingController.search));
router.route('/setting/list').get(catchErrors(settingController.list));
router.route('/setting/listAll').get(catchErrors(settingController.listAll));
router.route('/setting/filter').get(catchErrors(settingController.filter));
router
  .route('/setting/readBySettingKey/:settingKey')
  .get(catchErrors(settingController.readBySettingKey));
router.route('/setting/listBySettingKey').get(catchErrors(settingController.listBySettingKey));
router.route('/setting/updateBySettingKey/:settingKey').patch(catchErrors(settingController.updateBySettingKey));
router.route('/setting/upload/:settingKey?').patch(catchErrors(singleStorageUpload({ entity: 'setting', fieldName: 'settingValue', fileType: 'image' })),catchErrors(settingController.updateBySettingKey));
 

router.route('/setting/updateManySetting').patch(catchErrors(settingController.updateManySetting));

// _______________________________ API for Email Templates _______________________________

router.route('/email/create').post(catchErrors(emailController.create));
router.route('/email/read/:id').get(catchErrors(emailController.read));
router.route('/email/update/:id').patch(catchErrors(emailController.update));
router.route('/email/search').get(catchErrors(emailController.search));
router.route('/email/list').get(catchErrors(emailController.list));
router.route('/email/listAll').get(catchErrors(emailController.listAll));
router.route('/email/filter').get(catchErrors(emailController.filter));

// _______________________________ Registration API Endpoint _______________________________

router.route('/register').post(catchErrors(register));

module.exports = router;
