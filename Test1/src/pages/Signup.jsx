import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import API from '../api/api'

export default function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    full_name: '',
    email: '',
    password: '',
    confirm_password: ''

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await API.post(
        '/signup',
        formData
      )

      alert('Signup successful')

      navigate('/login')

    } catch (error) {

      alert(
        error.response?.data?.error
      )
    }
  }

return (

  <div className="page-container">

    <div className="auth-box">

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />

        <button type="submit">

          Signup

        </button>

      </form>
      

<p
  style={{
    marginTop: '20px',
    textAlign: 'center'
  }}
>
  Already have an account?

  {' '}

  <Link to="/login">
    Login
  </Link>

</p>
    </div>

  </div>
)

}
