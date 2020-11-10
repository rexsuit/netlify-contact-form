const nodemailer = require("nodemailer")

exports.handler = function (event, context, callback) {
  let data = JSON.parse(event.body)

  let transporter = nodemailer.createTransport({
    host: [process.env.HOST],
    port: [process.env.PORT],
    auth: {
      user: [process.env.USER],
      pass: [process.env.PASS],
    },
  })

  transporter.sendMail(
    {
      from: [process.env.EMAIL],
      to: [process.env.RECIPIENT],
      subject: `Sending with React, Nodemailer and Netlify`,
      html: `
            <h3>Email from ${data.name} ${data.email}<h3>
            <p>${data.message}<p>
            `,
    },
    function (error, info) {
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
