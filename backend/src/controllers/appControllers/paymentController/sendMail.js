
// const nodemailer = require('nodemailer');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// // Function to generate PDF
// const generatePdf = (filePath, content) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(filePath);

//     doc.pipe(stream);
//     doc.text(content, 100, 100);
//     doc.end();

//     stream.on('finish', () => resolve(filePath));
//     stream.on('error', (err) => reject(err));
//   });
// };

// // Function to send email
// const sendMail = async (toEmail, subject, text) => {
//   try {
//     // Create a Nodemailer transporter using SMTP or other transport mechanisms
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com', // SMTP host
//       port: 587, // Port
//       secure: false, // true for 465, false for other ports; if true, use SSL
//       auth: {
//         user: 'noorinjahan413@gmail.com', // Your email address
//         pass: 'zncs qaeb yvvm hhtj', // Your password
//       },
//     });

//     // Generate PDF
//     const pdfPath = path.join(__dirname, 'sample.pdf');
//     await generatePdf(pdfPath, text);

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Anmol" noorinjahan413@gmail.com', // sender address
//       to: toEmail, // list of receivers
//       subject: subject, // Subject line
//       text: text, // plain text body
//       attachments: [
//         {
//           filename: 'sample.pdf',
//           path: pdfPath,
//         },
//       ],
//     });

//     console.log('Message sent: %s', info.messageId);

//     // Clean up the generated PDF file
//     fs.unlinkSync(pdfPath);

//     return { success: true, message: 'Email sent successfully', result: info };
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     return { success: false, message: 'Failed to send email', error: error.message };
//   }
// };

// module.exports = { sendMail };

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Function to send email
const sendMail = async (toEmail, subject, text, pdfFilePath) => {
  try {
    console.log('PDF File Path:', pdfFilePath);
    // Create a Nodemailer transporter using SMTP or other transport mechanisms
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP host
      port: 587, // Port
      secure: false, // true for 465, false for other ports; if true, use SSL
      auth: {
        user: 'noorinjahan413@gmail.com', // Your email address
        pass: 'zncs qaeb yvvm hhtj', // Your password
      },
    });

    // Check if the PDF file exists
    if (!fs.existsSync(pdfFilePath)) {
      throw new Error('PDF file not found');
    }

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Anmol" <noorinjahan413@gmail.com>', // sender address
      to: toEmail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      attachments: [
        {
          filename: path.basename(pdfFilePath),
          path: pdfFilePath,
        },
      ],
    });

    console.log('Message sent: %s', info.messageId);

    return { success: true, message: 'Email sent successfully', result: info };
  } catch (error) {
    
    console.error('Error sending email:', error.message);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

module.exports = { sendMail };


