import { useState } from 'react'

import API from '../api/api'

export default function ForgotPassword() {

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await API.post(

        '/forgot-password',

        { email }

      )

      alert(response.data.message)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div>

      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button type="submit">

          Send Reset Link

        </button>

      </form>

    </div>
  )
}
