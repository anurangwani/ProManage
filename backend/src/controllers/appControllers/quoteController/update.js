const mongoose = require('mongoose');
const Model = mongoose.model('Quote');
const { calculate } = require('@/helpers');

const update = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  // console.log(updateData);

  if (!id || !updateData) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Both id and updateData are required.',
    });
  }

  try {
    const { items = [], taxRate = 0, discount = 0 } = updateData;

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

    updateData['subTotal'] = subTotal;
    updateData['taxTotal'] = taxTotal;
    updateData['total'] = total;

    const updatedDocument = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate('createdBy', 'name').exec();

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Document not found.',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedDocument,
      message: 'Document updated successfully.',
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
