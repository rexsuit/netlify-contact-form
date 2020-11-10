import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import axios from "axios"

const defaultState = {
  name: "",
  email: "",
  message: "",
  sent: false,
  buttonText: "Submit",
  err: "",
}

export function ContactForm() {
  const [data, setData] = useState(defaultState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const resetForm = () => setData(defaultState)

  const formSubmit = (e) => {
    e.preventDefault()

    setData({
      ...data,
      buttonText: "Sending...",
    })

    axios
      .post("/api/sendmail", data)
      .then((res) => {
        if (res.data.result !== "success") {
          setData({
            ...data,
            buttonText: "Failed to send",
            sent: false,
            err: "fail",
          })
          setTimeout(() => {
            resetForm()
          }, 6000)
        } else {
          setData({
            ...data,
            sent: true,
            buttonText: "Sent",
            err: "success",
          })
          setTimeout(() => {
            resetForm()
          }, 6000)
        }
      })
      .catch(() => {
        setData({
          ...data,
          buttonText: "Failed to send",
          err: "fail",
        })
      })
  }

  return (
    <>
      <FormControl fullWidth={true}>
        <TextField
          onChange={handleChange}
          required
          label="Full name"
          variant="filled"
          id="full-name"
          name="name"
          className="form-field"
        />
      </FormControl>
      <FormControl fullWidth={true}>
        <TextField
          onChange={handleChange}
          required
          label="Email"
          id="email"
          name="email"
          variant="filled"
          className="form-field"
        />
      </FormControl>
      <FormControl fullWidth={true}>
        <TextField
          onChange={handleChange}
          required
          label="Message"
          variant="filled"
          name="message"
          multiline={true}
          rows="10"
        />
      </FormControl>
      <FormControl>
        <div style={{ padding: 20 }}>
          <div className="form-submit">
            <Button variant="contained" color="primary" onClick={formSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </FormControl>
    </>
  )
}
