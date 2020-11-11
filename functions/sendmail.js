const nodemailer = require("nodemailer")

exports.handler = function (event, context, callback) {
  let data = JSON.parse(event.body)
  const transportData = {
    // host: process.env.REACT_APP_EMAIL_HOST,
    // port: process.env.REACT_APP_EMAIL_PORT,
    service: process.env.REACT_APP_SERVICE,
    secure: false,
    auth: {
      user: process.env.REACT_APP_USER,
      pass: process.env.REACT_APP_PASS,
    },
    logger: true,
  }

  console.log({ transportData })

  let transporter = nodemailer.createTransport(transportData)

  transporter.sendMail(
    {
      from: process.env.REACT_APP_EMAIL,
      to: process.env.REACT_APP_RECIPIENT,
      subject: `Sending with React, Nodemailer and Netlify`,
      html: `
            <h3>Email from ${data.name} ${data.email}<h3>
            <p>${data.message}<p>
            `,
    },
    function (error, info) {
      console.log(JSON.stringify(error, null, 2))
      if (error) {
        callback(error)
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            result: "success",
          }),
        })
      }
    },
  )
}
