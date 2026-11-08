import nodemailer from 'nodemailer';
/* class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Vishavjeet <${process.env.EMAIL_FROM}>`;
  }
}
 */
const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    logger: true,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Defining the email options

  const mailOptions = {
    from: '"Vishav" <hello@vishav.io>', // sender address
    to: options.email, // list of recipients
    subject: options.subject, // subject line
    text: options.message, // plain text body
    //html: "<b>Hello world?</b>",
  };

  // Actually sending the email
  await transporter.sendMail(mailOptions);
};

export { sendEmail };
