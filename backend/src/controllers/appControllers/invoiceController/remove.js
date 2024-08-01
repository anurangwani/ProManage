const mongoose = require('mongoose');

const Model = mongoose.model('Invoice');
const ModalPayment = mongoose.model('Payment');

const remove = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'No ID provided',
    });
  }

  try {
    // Find and remove the invoice
    const result = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      { removed: true },
      { new: true }
    ).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found with the provided ID',
      });
    }

    // Also mark associated payments as removed
    await ModalPayment.updateMany(
      { invoice: id },
      { removed: true }
    ).exec();

    return res.status(200).json({
      success: true,
      result: null,
      message: 'Invoice and associated payments removed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error removing document: ' + error.message,
    });
  }
};

module.exports = remove;
