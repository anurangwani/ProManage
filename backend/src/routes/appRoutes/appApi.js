const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();
const Invoice=require("@/models/appModels/Invoice");

const appControllers = require('@/controllers/appControllers');
const { routesList } = require('@/models/utils');

const routerApp = (entity, controller) => {
  router.route(`/${entity}/create`).post(catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/updateMany/:id`).patch(catchErrors(controller['updateMany']));
  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  // router.route(`/invoice/read/:id`).get(async (req, res) => {
  //   try {
  //     const invoice = await Invoice.findById(req.params.id);
  //     if (!invoice) {
  //       return res.status(404).json({ success: false, message: 'No document found' });
  //     }
  //     res.json({ success: true, result: invoice });
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // })

  if (entity === 'invoice' || entity === 'quote' || entity === 'offer' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).post(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  const controller = appControllers[controllerName];
  routerApp(entity, controller);
});

module.exports = router;
