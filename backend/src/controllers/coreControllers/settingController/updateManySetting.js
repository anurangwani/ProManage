// const Setting = require('@/models/coreModels/Setting');
// const updateManySetting = async (req, res) => {
//   const settings = req.body.settings; // Assuming 'settings' is the array of settings to update

//   // Check if 'settings' is not an array or if it's empty
//   if (!Array.isArray(settings) || settings.length === 0) {
//     return res.status(400).json({
//       success: false,
//       result: null,
//       message: 'Invalid request body. Please provide an array of settings to update.',
//     });
//   }

//   try {
//     const updatePromises = settings.map(async (setting) => {
//       const { settingKey, settingValue } = setting;

//       if (!settingKey) {
//         throw new Error('settingKey is required for each setting.');
//       }

//       const updatedSetting = await Setting.findOneAndUpdate(
//         { settingKey },
//         { settingValue },
//         { new: true, upsert: true, runValidators: true }
//       );
//       console.log(updatedSetting);
//       return updatedSetting;
//     });

//     const updatedSettings = await Promise.all(updatePromises);

//     return res.status(200).json({
//       success: true,
//       result: updatedSettings,
//       message: 'Settings updated successfully',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       result: null,
//       message: 'Error updating settings: ' + error.message,
//     });
//   }
// };

// module.exports = updateManySetting;
const Setting = require('@/models/coreModels/Setting');

const updateManySetting = async (req, res) => {
  const settings = req.body.settings; // Assuming 'settings' is the array of settings to update

  // Check if 'settings' is not an array or if it's empty
  if (!Array.isArray(settings) || settings.length === 0) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid request body. Please provide an array of settings to update.',
    });
  }

  try {
    const updatePromises = settings.map(async (setting) => {
      const { settingKey, settingValue } = setting;

      if (!settingKey) {
        throw new Error('settingKey is required for each setting.');
      }

      const updatedSetting = await Setting.findOneAndUpdate(
        { settingKey },
        { settingValue },
        { new: true, upsert: true, runValidators: true }
      );
      return updatedSetting;
    });

    const updatedSettings = await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      result: updatedSettings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error updating settings: ' + error.message,
    });
  }
};

module.exports = updateManySetting;
