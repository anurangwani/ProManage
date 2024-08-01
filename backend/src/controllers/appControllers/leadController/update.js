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
    const { type, people, company } = req.body;

    // Find the lead by id
    let lead = await Model.findOne({
      _id: id,
      removed: false,
    }).exec();

    if (!lead) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found with the provided ID',
      });
    }

    // Update logic without additional validations
    if (type === 'people') {
      if (!people) {
        return res.status(403).json({
          success: false,
          message: 'Please select a person',
        });
      }

      let person = await People.findOneAndUpdate(
        { _id: people, removed: false },
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

    } else if (type === 'company') {
      if (!company) {
        return res.status(403).json({
          success: false,
          message: 'Please select a company',
        });
      }

      let companyDoc = await Company.findOneAndUpdate(
        { _id: company, removed: false },
        { isClient: true },
        { new: true, runValidators: true }
      ).exec();

      if (!companyDoc) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'Company not found',
        });
      }

      req.body.name = companyDoc.name;
      req.body.people = undefined;
    }

    // Update the lead document
    lead = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      { ...req.body },
      { new: true, runValidators: true }
    ).exec();

    return res.status(200).json({
      success: true,
      result: lead,
      message: 'Lead updated successfully',
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
