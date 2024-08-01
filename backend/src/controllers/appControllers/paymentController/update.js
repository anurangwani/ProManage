// // const mongoose = require('mongoose');
// // const Invoice = mongoose.model('Invoice');
// // const Payment = mongoose.model('Payment');
// // const { calculate } = require('@/helpers');

// // const update = async (req, res) => {
// //   const id = req.params.id;

// //   if (!id) {
// //     return res.status(400).json({
// //       success: false,
// //       result: null,
// //       message: 'No ID provided',
// //     });
// //   }

// //   try {
// //     // Fetch the current payment details
// //     const currentPayment = await Payment.findOne({ _id: id, removed: false }).exec();
// //     if (!currentPayment) {
// //       console.log('Payment ID:', id);
// //       return res.status(404).json({
// //         success: false,
// //         result: null,
// //         message: 'Payment not found or already removed',
// //       });
// //     }

// //     // Fetch the associated invoice details
// //     const currentInvoice = await Invoice.findOne({ _id: currentPayment.invoice, removed: false }).exec();
// //     if (!currentInvoice) {
// //       console.log('Payment ID:', id);
// //       console.log('Invoice ID:', currentPayment.invoice); // Log the invoice ID for debugging
// //       return res.status(404).json({
// //         success: false,
// //         result: null,
// //         message: 'Invoice not found or already removed',
// //       });
// //     }

// //     const previousAmount = currentPayment.amount;
// //     const newAmount = req.body.amount;

// //     if (newAmount === 0) {
// //       return res.status(202).json({
// //         success: false,
// //         result: null,
// //         message: 'The Minimum Amount couldn\'t be 0',
// //       });
// //     }

// //     const {
// //       total: previousTotal,
// //       discount: previousDiscount,
// //       credit: previousCredit,
// //     } = currentInvoice;

// //     const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

// //     if (newAmount > maxAmount) {
// //       return res.status(202).json({
// //         success: false,
// //         result: null,
// //         message: `The Max Amount you can add is ${maxAmount}`,
// //       });
// //     }

// //     req.body['updatedBy'] = req.admin._id;

// //     const result = await Payment.findOneAndUpdate(
// //       { _id: id, removed: false },
// //       req.body,
// //       { new: true, runValidators: true }
// //     ).exec();

// //     if (!result) {
// //       return res.status(404).json({
// //         success: false,
// //         result: null,
// //         message: 'Payment not found or already removed',
// //       });
// //     }

// //     const amountDifference = newAmount - previousAmount;
// //     const updatedCredit = calculate.add(previousCredit, amountDifference);
// //     let paymentStatus =
// //       calculate.sub(previousTotal, previousDiscount) === updatedCredit
// //         ? 'paid'
// //         : updatedCredit > 0
// //         ? 'partially'
// //         : 'unpaid';

// //     const updatedRemainingAmount = calculate.sub(previousTotal, calculate.add(updatedCredit, previousDiscount));

// //     const invoiceUpdate = await Invoice.findOneAndUpdate(
// //       { _id: currentPayment.invoice },
// //       {
// //         credit: updatedCredit,
// //         remainingAmount: updatedRemainingAmount,
// //         paymentStatus: paymentStatus,
// //       },
// //       {
// //         new: true,
// //         runValidators: true,
// //       }
// //     ).exec();

// //     return res.status(200).json({
// //       success: true,
// //       result: result,
// //       message: 'Payment successfully updated',
// //     });
// //   } catch (error) {
// //     console.error('Error updating payment:', error.message);
// //     return res.status(500).json({
// //       success: false,
// //       result: null,
// //       message: 'Error updating payment: ' + error.message,
// //     });
// //   }
// // };

// // module.exports = update;
// const mongoose = require('mongoose');
// const Invoice = mongoose.model('Invoice');
// const Payment = mongoose.model('Payment');
// const { calculate } = require('@/helpers');

// const update = async (req, res) => {
//   const id = req.params.id;

//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       result: null,
//       message: 'No ID provided',
//     });
//   }

//   try {
//     const currentPayment = await Payment.findOne({ _id: id, removed: false }).exec();
//     if (!currentPayment) {
//       return res.status(404).json({
//         success: false,
//         result: null,
//         message: 'Payment not found or already removed',
//       });
//     }

//     const currentInvoice = await Invoice.findOne({ _id: currentPayment.invoice, removed: false }).exec();
//     if (!currentInvoice) {
//       return res.status(404).json({
//         success: false,
//         result: null,
//         message: 'Invoice not found or already removed',
//       });
//     }

//     const previousAmount = currentPayment.amount;
//     const newAmount = req.body.amount;

//     if (newAmount === 0) {
//       return res.status(202).json({
//         success: false,
//         result: null,
//         message: 'The Minimum Amount couldn\'t be 0',
//       });
//     }

//     const {
//       total: previousTotal,
//       discount: previousDiscount,
//       credit: previousCredit,
//     } = currentInvoice;

//     const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

//     if (newAmount > maxAmount) {
//       return res.status(202).json({
//         success: false,
//         result: null,
//         message: `The Max Amount you can add is ${maxAmount}`,
//       });
//     }

//     req.body['updatedBy'] = req.admin._id;

//     const result = await Payment.findOneAndUpdate(
//       { _id: id, removed: false },
//       req.body,
//       { new: true, runValidators: true }
//     ).exec();

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         result: null,
//         message: 'Payment not found or already removed',
//       });
//     }

//     const amountDifference = newAmount - previousAmount;
//     const updatedCredit = calculate.add(previousCredit, amountDifference);
//     let paymentStatus =
//       calculate.sub(previousTotal, previousDiscount) === updatedCredit
//         ? 'paid'
//         : updatedCredit > 0
//         ? 'partially'
//         : 'unpaid';

//     const updatedRemainingAmount = calculate.sub(previousTotal, calculate.add(updatedCredit, previousDiscount));

//     const invoiceUpdate = await Invoice.findOneAndUpdate(
//       { _id: currentPayment.invoice },
//       {
//         credit: updatedCredit,
//         remainingAmount: updatedRemainingAmount,
//         paymentStatus: paymentStatus,
//       },
//       { new: true, runValidators: true }
//     ).exec();

//     return res.status(200).json({
//       success: true,
//       result: result,
//       message: 'Payment successfully updated',
//     });
//   } catch (error) {
//     console.error('Error updating payment:', error.message);
//     return res.status(500).json({
//       success: false,
//       result: null,
//       message: 'Error updating payment: ' + error.message,
//     });
//   }
// };

// module.exports = update;
// 

const mongoose = require('mongoose');
const Payment = mongoose.model('Payment'); // Adjust the path according to your project structure
const Invoice = mongoose.model('Invoice'); // Adjust the path according to your project structure

const update = async (req, res) => {
  const id = req.params.id;
  const { amount: newAmount, invoice } = req.body;

  if (!id || newAmount === undefined) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Both id and amount are required.',
    });
  }

  if (!invoice) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invoice ID is required',
    });
  }

  try {
    const currentPayment = await Payment.findOne({ _id: id, removed: false }).exec();
    if (!currentPayment) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Payment not found or already removed',
      });
    }

    console.log('Current Payment:', currentPayment); // Log current payment details

    req.body['updatedBy'] = req.admin._id;

    const updatedPayment = await Payment.findOneAndUpdate(
      { _id: id, removed: false },
      { $set: { amount: newAmount, invoice: invoice, updatedBy: req.admin._id } },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Payment not found or already removed',
      });
    }

    console.log('Updated Payment:', updatedPayment); // Log updated payment details

    return res.status(200).json({
      success: true,
      result: updatedPayment,
      message: 'Payment successfully updated',
    });
  } catch (error) {
    console.error('Error updating payment:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating payment: ' + error.message,
    });
  }
};

module.exports = update
