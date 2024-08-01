


// const { sendMail } = require('./sendMail'); // Adjust the path according to your project structure
// const People = require('@/models/appModels/People');

// const mail = async (req, res) => {
//   const { subject, message } = req.body; // Assuming your request body has subject and message fields

//   try {
//     // Fetch email addresses from People model
//     const people = await People.find({}).select('email').exec();
//     const emailAddresses = people.map(person => person.email);
//     console.log(emailAddresses);

//     // Send email to all addresses
//     const emailResults = await Promise.all(
//       emailAddresses.map(email => sendMail(email, subject, message))
//     );

//     const successfulEmails = emailResults.filter(result => result.success);
//     const failedEmails = emailResults.filter(result => !result.success);

//     if (successfulEmails.length > 0) {
//       return res.status(200).json({
//         success: true,
//         result: successfulEmails.map(result => result.result),
//         message: 'Email sent successfully',
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         result: null,
//         message: 'Failed to send email to all recipients',
//       });
//     }
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     return res.status(500).json({
//       success: false,
//       result: null,
//       message: 'Error sending email: ' + error.message,
//     });
//   }
// };

// module.exports = mail;
const { sendMail } = require('./sendMail'); // Adjust the path according to your project structure
const People = require('@/models/appModels/People');
const path = require('path');

const mail = async (req, res) => {
  const { id: { invoiceId }, subject, message } = req.body; // Extracting invoiceId from req.body

  try {
    // Log request body for debugging
    console.log('Request Body:', req.body);

    // Fetch email addresses from People model
    const people = await People.find({}).select('email').exec();
    const emailAddresses = people.map(person => person.email);
    console.log('Email Addresses:', emailAddresses);

    // Construct the PDF file name and path
    const pdfFileName = `payment-${invoiceId}.pdf`;
    const pdfFilePath = path.join( 'D:/idurar-erp-crm-master/idurar-erp-crm-master/backend/src/', 'public', 'download', 'payment', pdfFileName); // Adjust the path according to your project structure
    console.log('Constructed PDF File Path:', pdfFilePath); // Debug log

    // Send email to all addresses
    const emailResults = await Promise.all(
      emailAddresses.map(email => sendMail(email, "Your Payment from ProManage", message, pdfFilePath))
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
