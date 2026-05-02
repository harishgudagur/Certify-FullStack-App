import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import API from '../api/api'

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: '',
    password: ''

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

      const response = await API.post(

        '/login',

        formData
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      navigate('/dashboard')

    } catch (error) {

      alert(
        error.response?.data?.error
      )
    }
  }


return (

  <div className="page-container">

    <div className="auth-box">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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

        <button type="submit">

          Login

        </button>

      </form>

<p
  style={{
    marginTop: '20px',
    textAlign: 'center'
  }}
>

  Don’t have an account?

  {' '}

  <Link to="/signup">
    Signup
  </Link>

</p>

    </div>

  </div>
)


}
