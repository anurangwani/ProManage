const mongoose = require('mongoose');
const Model = mongoose.model('Setting');

const updateBySettingKey = async ({ settingKey, settingValue }) => {
  try {
    if (!settingKey || !settingValue) {
      return null; // Missing required fields, return null
    }

    const result = await Model.findOneAndUpdate(
      { settingKey },
      { settingValue },
      { new: true, runValidators: true }
    ).exec();

    if (!result) {
      return null; // No document found with the provided settingKey
    }

    return result; // Return the updated document
  } catch (error) {
    console.error('Error updating setting:', error);
    return null; // Return null in case of any errors
  }
};

module.exports = updateBySettingKey;
