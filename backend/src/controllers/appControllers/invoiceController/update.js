const mongoose = require('mongoose');
const Model = mongoose.model('Invoice');
const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');

const update = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  // Validate the request body
  const { error, value } = schema.validate(updateData);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  if (!id || !updateData) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Both id and updateData are required.',
    });
  }

  try {
    const { items = [], taxRate = 0, discount = 0 } = value;

    // Calculate the items array with subTotal, total, taxTotal
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;

    items.forEach((item) => {
      let itemTotal = calculate.multiply(item['quantity'], item['price']);
      // sub total
      subTotal = calculate.add(subTotal, itemTotal);
      // item total
      item['total'] = itemTotal;
    });
    taxTotal = calculate.multiply(subTotal, taxRate / 100);
    total = calculate.add(subTotal, taxTotal);

    value['subTotal'] = subTotal;
    value['taxTotal'] = taxTotal;
    value['total'] = total;

    let paymentStatus = calculate.sub(total, discount) === 0 ? 'paid' : 'unpaid';
    value['paymentStatus'] = paymentStatus;

    // Updating the document in the collection
    const updatedDocument = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      value,
      {
        new: true,
        runValidators: true,
      }
    ).populate('createdBy', 'name').exec();

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found with the provided ID',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedDocument,
      message: 'Invoice updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating document: ' + error.message,
    });
  }
};

module.exports = update;
