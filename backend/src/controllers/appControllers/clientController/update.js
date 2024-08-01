const mongoose = require('mongoose');
const People = mongoose.model('People');
const Company = mongoose.model('Company');

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
    // Find and update the client based on type
    let client;
    if (req.body.type === 'people') {
      if (!req.body.people) {
        return res.status(403).json({
          success: false,
          message: 'Please select a person',
        });
      }

      let person = await People.findOneAndUpdate(
        { _id: req.body.people, removed: false },
        { isClient: true },
        { new: true, runValidators: true }
      ).exec();

      if (!person) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'Person not found',
        });
      }

      req.body.name = person.firstname + ' ' + person.lastname;
      req.body.company = undefined;

      client = await Model.findOneAndUpdate(
        { _id: id, removed: false },
        { ...req.body },
        { new: true, runValidators: true }
      ).exec();
    } else {
      if (!req.body.company) {
        return res.status(403).json({
          success: false,
          message: 'Please select a company',
        });
      }

      let company = await Company.findOneAndUpdate(
        { _id: req.body.company, removed: false },
        { isClient: true },
        { new: true, runValidators: true }
      ).exec();

      if (!company) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'Company not found',
        });
      }

      req.body.name = company.name;
      req.body.people = undefined;

      client = await Model.findOneAndUpdate(
        { _id: id, removed: false },
        { ...req.body },
        { new: true, runValidators: true }
      ).exec();
    }

    if (!client) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found with the provided ID',
      });
    }

    return res.status(200).json({
      success: true,
      result: client,
      message: 'Client updated successfully',
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
