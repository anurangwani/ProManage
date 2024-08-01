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


