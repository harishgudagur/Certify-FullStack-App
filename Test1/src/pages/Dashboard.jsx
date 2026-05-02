import { useEffect, useState } from 'react'

import API from '../api/api'

import OpportunityCard from '../components/OpportunityCard'

export default function Dashboard() {

  const [search, setSearch] = useState('')

  const [opportunities, setOpportunities] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const [formData, setFormData] =
    useState({

      name: '',
      duration: '',
      start_date: '',
      description: '',
      skills: '',
      category: '',
      future_opportunities: '',
      max_applicants: ''

    })

  const fetchOpportunities = async () => {

    try {

      const response = await API.get(
        '/opportunities'
      )

      setOpportunities(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    fetchOpportunities()

  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editingId) {

        await API.put(

          `/opportunities/${editingId}`,

          formData

        )

      } else {

        await API.post(

          '/opportunities',

          formData

        )
      }

      fetchOpportunities()

      setEditingId(null)

      setFormData({

        name: '',
        duration: '',
        start_date: '',
        description: '',
        skills: '',
        category: '',
        future_opportunities: '',
        max_applicants: ''

      })

    } catch (error) {

      console.log(error)

    }
  }

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this opportunity?'
      )

    if (!confirmDelete) return

    try {

      await API.delete(
        `/opportunities/${id}`
      )

      fetchOpportunities()

    } catch (error) {

      console.log(error)

    }
  }

  const handleEdit = (opportunity) => {

    setEditingId(opportunity.id)

    setFormData({

      name: opportunity.name,

      duration:
        opportunity.duration,

      start_date:
        opportunity.start_date,

      description:
        opportunity.description,

      skills:
        opportunity.skills,

      category:
        opportunity.category,

      future_opportunities:
        opportunity.future_opportunities,

      max_applicants:
        opportunity.max_applicants

    })
  }

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>

          <h1>
            Opportunity Dashboard
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '8px'
            }}
          >

            Welcome back, Admin 👋

          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem(
              'token'
            )

            window.location.href =
              '/login'

          }}
        >

          Logout

        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            {opportunities.length}
          </h2>

          <p>
            Total Opportunities
          </p>

        </div>

        <div className="stat-card">

          <h2>

            {
              opportunities.filter(
                item =>
                  item.category ===
                  'Technology'
              ).length
            }

          </h2>

          <p>Technology</p>

        </div>

        <div className="stat-card">

          <h2>

            {
              opportunities.filter(
                item =>
                  item.category ===
                  'Business'
              ).length
            }

          </h2>

          <p>Business</p>

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="form-card">

          <h2
            style={{
              marginBottom: '20px'
            }}
          >

            {
              editingId
                ? 'Update Opportunity'
                : 'Create Opportunity'
            }

          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Opportunity Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
            />

            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="">
                Select Category
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Business">
                Business
              </option>

              <option value="Design">
                Design
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Data Science">
                Data Science
              </option>

            </select>

            <input
              type="text"
              name="future_opportunities"
              placeholder="Future Opportunities"
              value={
                formData.future_opportunities
              }
              onChange={handleChange}
            />

            <input
              type="number"
              name="max_applicants"
              placeholder="Max Applicants"
              value={
                formData.max_applicants
              }
              onChange={handleChange}
            />

            <button type="submit">

              {
                editingId
                  ? 'Update Opportunity'
                  : 'Create Opportunity'
              }

            </button>

          </form>

        </div>

        <div className="list-card">

          <div className="list-header">

            <h2>
              All Opportunities
            </h2>

          </div>

          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              marginBottom: '20px'
            }}
          />

          {
            opportunities.length === 0

              ? (

                <div className="empty-state">

                  <h3>
                    No opportunities yet
                  </h3>

                  <p>
                    Create your first opportunity
                  </p>

                </div>

              )

              : (

                opportunities

                  .filter((item) =>

                    item.name
                      .toLowerCase()

                      .includes(
                        search.toLowerCase()
                      )
                  )

                  .map((opportunity) => (

                    <OpportunityCard

                      key={opportunity.id}

                      opportunity={opportunity}

                      onDelete={
                        handleDelete
                      }

                      onEdit={
                        handleEdit
                      }

                    />

                  ))
              )
          }

        </div>

      </div>

    </div>
  )
}
