const mongoose = require('mongoose');

const updateMany = async (Model, req, res) => {
  const { ids, updateData } = req.body;

  if (!Array.isArray(ids) || ids.length === 0 || !updateData) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Both ids and updateData are required.',
    });
  }

  try {
    const updatePromises = ids.map(async (id) => {
      const updatedDocument = await Model.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedDocument) {
        throw new Error(`Document with id ${id} not found.`);
      }

      return updatedDocument;
    });

    const updatedDocuments = await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      result: updatedDocuments,
      message: 'Documents updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating documents: ' + error.message,
    });
  }
};

module.exports = updateMany;
