import nodemailer from 'nodemailer';

// Function to send email with published tender data
const sendPublishedTendersEmail = async (email, firstName, lastName, publishedTendersData) => {
  try {
    // Create a transporter with your SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'your-smtp-host',
      port: 587, // or the appropriate port for your SMTP server
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'yashs3324',
        pass: 's3324@Ironman',
      },
    });

    // Define email content
    const mailOptions = {
      from: 'cinematicvision1403@gmail.com', // Sender address
      to: email, // List of recipients
      subject: 'New Tenders Published', // Subject line
      html: `
        <p>Hello ${firstName} ${lastName},</p>
        <p>We are pleased to inform you that new tenders have been published. Here are the details:</p>
        <ul>
          ${publishedTendersData.map(tender => `<li>${tender.title}: ${tender.description}</li>`).join('')}
        </ul>
        <p>Thank you for using our platform.</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendPublishedTendersEmail;
