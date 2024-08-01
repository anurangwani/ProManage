const mongoose = require('mongoose');

const remove = async (Model, req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'No ID provided',
    });
  }

  try {
    const result = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      { removed: true },
      { new: true }
    ).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Document not found or already removed',
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Document successfully removed',
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
