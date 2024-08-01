const mongoose = require('mongoose');
//const Client = mongoose.model('Client');

const remove = async (Model, req, res) => {
  const { id } = req.params;

  // if (!id) {
  //   return res.status(400).json({
  //     success: false,
  //     result: null,
  //     message: 'ID is required.',
  //   });
  // }

  try {
    const deletedDocument = await Model.findByIdAndDelete(id).populate('company', 'name').exec();

    if (!deletedDocument) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Document not found.',
      });
    }

    return res.status(200).json({
      success: true,
      result: deletedDocument,
      message: 'Document deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error deleting document: ' + error.message,
    });
  }
};

module.exports = remove;
