
import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

// Route to send itinerary email
const EmailItinerary = async (req, res) => {
  const { email, itinerary } = req.body;

  if (!email || !itinerary) {
    return res.status(400).json({ message: 'Email and itinerary are required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Flight Itinerary',
    text: `Here is your flight itinerary:\n\n${itinerary}`,
    html: `<h3>Your Flight Itinerary</h3><p>${itinerary}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Itinerary sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send itinerary', error });
  }
};

export default EmailItinerary;
