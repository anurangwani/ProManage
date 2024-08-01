const { sendMail } = require('./sendMail'); // Adjust the path according to your project structure
const People = require('@/models/appModels/People');
const path = require('path');

const mail = async (req, res) => {
  const { id, subject, message } = req.body; // Extracting id, subject, and message from req.body
  const invoiceId = id.invoiceId; // Ensure we're accessing the correct field

  try {
    // Log request body for debugging
    console.log('Request Body:', req.body);

    // Fetch email addresses from People model
    const people = await People.find({}).select('email').exec();
    const emailAddresses = people.map(person => person.email);
    console.log('Email Addresses:', emailAddresses);

    // Construct the PDF file name and path
    const pdfFileName = `invoice-${id}.pdf`;
    console.log('PDF File Name:', pdfFileName);

    const pdfFilePath = path.join('D:/idurar-erp-crm-master/idurar-erp-crm-master/backend/src/', 'public', 'download', 'invoice', pdfFileName); // Adjust the path according to your project structure
    console.log('Constructed PDF File Path:', pdfFilePath); // Debug log

    // Check if the PDF file exists before attempting to send it
    // if (!fs.existsSync(pdfFilePath)) {
    //   throw new Error('PDF file not found');
    // }

    // Send email to all addresses
    const emailResults = await Promise.all(
      emailAddresses.map(email => sendMail(email, "Your Invoice from ProManage", message, pdfFilePath))
    );

    const successfulEmails = emailResults.filter(result => result.success);
    const failedEmails = emailResults.filter(result => !result.success);

    if (successfulEmails.length > 0) {
      return res.status(200).json({
        success: true,
        result: successfulEmails.map(result => result.result),
        message: 'Email sent successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Failed to send email to all recipients',
      });
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Error sending email: ' + error.message,
    });
  }
};

module.exports = mail;
