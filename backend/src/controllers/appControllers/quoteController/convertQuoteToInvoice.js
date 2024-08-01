// const convertQuoteToInvoice = async (req, res) => {
//   return res.status(200).json({
//     success: true,
//     result: null,
//     message: 'Please Upgrade to Premium  Version to have full features',
//   });
// };

// module.exports = convertQuoteToInvoice;
const Quote = require('@/models/appModels/Quote');
const Invoice = require('@/models/appModels/Invoice');

const convertQuoteToInvoice = async (req, res) => {
  const { id: quoteId } = req.params;

  // Log the request body and quoteId to verify their values
  console.log('Request Body:', req.body);
  console.log('Extracted Quote ID:', quoteId);

  if (!quoteId) {
    return res.status(400).json({
      success: false,
      message: 'quoteId is required',
    });
  }

  try {
    // Fetch the quote from the database
    const quote = await Quote.findById(quoteId).populate('client').exec();

    // Log the quote object to see what is returned
    console.log('Fetched Quote:', quote);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
    }

    // Create a new invoice based on the quote details
    const newInvoice = new Invoice({
      client: quote.client._id,
      items: quote.items,
      total: quote.total,
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set due date 30 days from now
      status: 'draft', // Ensure the status value is valid according to your schema
      number: quote.number,
      year: quote.year,
      date: quote.date,
      expiredDate: quote.expiredDate,
      createdBy: quote.createdBy,
    });

    // Save the new invoice to the database
    await newInvoice.save();

    return res.status(201).json({
      success: true,
      result: newInvoice,
      message: 'Quote successfully converted to invoice',
    });
  } catch (error) {
    console.error('Error converting quote to invoice:', error);
    return res.status(500).json({
      success: false,
      message: 'Error converting quote to invoice',
    });
  }
};

module.exports = convertQuoteToInvoice;
