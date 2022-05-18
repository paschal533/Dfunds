export default function (req, res) {
    require('dotenv').config()
    
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'okwuosahpaschal@gmail.com',
        pass: '84316860p',
      },
      secure: true,
    })
    const mailData = {
      from: 'okwuosahpaschal@gmail.com',
      to: 'okwuosahpaschal@gmail.com',
      subject: `Message From ${req.body.name}`,
      text: req.body.description + "benefeciary: " + req.body.beneficiary  + " | Sent from: DFunds@gmail.com ",
      html: `<div>${req.body.description}</div><p>Sent from:
      ${req.body.url}</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log("sent")
    })
    res.status(200)
  }