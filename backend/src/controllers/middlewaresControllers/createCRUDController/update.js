const update = async (Model, req, res) => {
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
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found with the provided ID',
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Document updated successfully',
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
