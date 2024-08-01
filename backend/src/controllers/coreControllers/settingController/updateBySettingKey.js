const mongoose = require('mongoose');
const Setting = mongoose.model('Setting');

const updateBySettingKey = async (req, res) => {
  const settingKey = req.params.settingKey;

  if (!settingKey) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'No settingKey provided',
    });
  }

  try {
    // Find the setting by key
    const setting = await Setting.findOne({ settingKey });

    if (!setting) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found by this settingKey: ' + settingKey,
      });
    }

    // Update the setting with new data from req.body
    Object.assign(setting, req.body);

    // Save the updated setting
    const updatedSetting = await setting.save();

    return res.status(200).json({
      success: true,
      result: updatedSetting,
      message: 'Setting updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating setting: ' + error.message,
    });
  }
};

module.exports = updateBySettingKey;
