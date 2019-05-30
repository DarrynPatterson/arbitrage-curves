import config from "config";
const nodemailer = require("nodemailer");

class Mailer {
  static sendMail(from: string = "", to: string = "", subject: string = "", body: string = ""): void {

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: config.get("email.host"),
      port: config.get("email.port"),
      secure: config.get("email.secure"), // true for 465, false for other ports
      auth: {
        user: config.get("email.username"),
        pass: config.get("email.password")
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
      from,
      to,
      subject,
      html: body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(error);
      }
      // console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // console.log("Email has been sent");
    });
  }
}

export default Mailer;