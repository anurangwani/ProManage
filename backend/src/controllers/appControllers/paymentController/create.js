// const mongoose = require('mongoose');

// const Model = mongoose.model('Payment');
// const Invoice = mongoose.model('Invoice');
// const custom = require('@/controllers/pdfController');

// const { calculate } = require('@/helpers');

// const create = async (req, res) => {
//   // Creating a new document in the collection
//   if (req.body.amount === 0) {
//     return res.status(202).json({
//       success: false,
//       result: null,
//       message: `The Minimum Amount couldn't be 0`,
//     });
//   }

//   const currentInvoice = await Invoice.findOne({
//     _id: req.body.invoice,
//     removed: false,
//   });

//   const {
//     total: previousTotal,
//     discount: previousDiscount,
//     credit: previousCredit,
//   } = currentInvoice;

//   const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

//   if (req.body.amount > maxAmount) {
//     return res.status(202).json({
//       success: false,
//       result: null,
//       message: `The Max Amount you can add is ${maxAmount}`,
//     });
//   }
//   req.body['createdBy'] = req.admin._id;

//   const result = await Model.create(req.body);

//   const fileId = 'payment-' + result._id + '.pdf';
//   const updatePath = await Model.findOneAndUpdate(
//     {
//       _id: result._id.toString(),
//       removed: false,
//     },
//     { pdf: fileId },
//     {
//       new: true,
//     }
//   ).exec();
//   // Returning successfull response

//   const { _id: paymentId, amount } = result;
//   const { id: invoiceId, total, discount, credit } = currentInvoice;

//   let paymentStatus =
//     calculate.sub(total, discount) === calculate.add(credit, amount)
//       ? 'paid'
//       : calculate.add(credit, amount) > 0
//       ? 'partially'
//       : 'unpaid';

//   const invoiceUpdate = await Invoice.findOneAndUpdate(
//     { _id: req.body.invoice },
//     {
//       $push: { payment: paymentId.toString() },
//       $inc: { credit: amount },
//       $set: { paymentStatus: paymentStatus },
//     },
//     {
//       new: true, // return the new result instead of the old one
//       runValidators: true,
//     }
//   ).exec();

//   return res.status(200).json({
//     success: true,
//     result: updatePath,
//     message: 'Payment Invoice created successfully',
//   });
// };

// module.exports = create;
const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');
const Payment = mongoose.model('Payment');
const { calculate } = require('@/helpers');

const create = async (req, res) => {
  if (req.body.amount === 0) {
    return res.status(202).json({
      success: false,
      result: null,
      message: 'The Minimum Amount couldn\'t be 0',
    });
  }

  const currentInvoice = await Invoice.findOne({
    _id: req.body.invoice,
    removed: false,
  });

  if (!currentInvoice) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Invoice not found or already removed',
    });
  }

  const {
    total: previousTotal,
    discount: previousDiscount,
    credit: previousCredit,
  } = currentInvoice;

  const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

  if (req.body.amount > maxAmount) {
    return res.status(202).json({
      success: false,
      result: null,
      message: `The Max Amount you can add is ${maxAmount}`,
    });
  }

  req.body['createdBy'] = req.admin._id;
  req.body['invoice'] = currentInvoice._id; // Ensure invoice field is set

  const result = await Payment.create(req.body);

  const fileId = 'payment-' + result._id + '.pdf';
  const updatePath = await Payment.findOneAndUpdate(
    { _id: result._id, removed: false },
    { pdf: fileId },
    { new: true }
  ).exec();

  const amount = req.body.amount;
  const updatedCredit = calculate.add(previousCredit, amount);
  let paymentStatus = calculate.sub(previousTotal, previousDiscount) === updatedCredit
    ? 'paid'
    : updatedCredit > 0
    ? 'partially'
    : 'unpaid';

  await Invoice.findOneAndUpdate(
    { _id: req.body.invoice },
    {
      $push: { payment: result._id.toString() },
      $inc: { credit: amount },
      $set: { paymentStatus: paymentStatus },
    },
    { new: true, runValidators: true }
  ).exec();

  return res.status(200).json({
    success: true,
    result: updatePath,
    message: 'Payment Invoice created successfully',
  });
};

module.exports = create;
