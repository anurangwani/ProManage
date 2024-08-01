// const Model = require('@/models/Entity'); // Replace with your actual model

const updateMany = async (Model,req, res) => {
  const updates = req.body.updates; // Assuming 'updates' is the array of updates to perform

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid request body. Please provide an array of updates to perform.',
    });
  }

  try {
    const updatePromises = updates.map(async (update) => {
      const { id, updateData } = update;

      if (!id || !updateData) {
        throw new Error('Both id and updateData are required for each update.');
      }

      const updatedEntity = await Model.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      return updatedEntity;
    });

    const updatedEntities = await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      result: updatedEntities,
      message: 'Entities updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating entities: ' + error.message,
    });
  }
};

module.exports = {
  updateMany,
};
