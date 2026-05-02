
export default function OpportunityCard({

  opportunity,
  onDelete,
  onEdit

}) {

  const getCategoryColor = () => {

    switch (opportunity.category) {

      case 'Technology':
        return '#dbeafe'

      case 'Business':
        return '#dcfce7'

      case 'Design':
        return '#f3e8ff'

      case 'Marketing':
        return '#fef3c7'

      case 'Data Science':
        return '#fee2e2'

      default:
        return '#e5e7eb'
    }
  }

  return (

    <div className="opportunity-card">

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >

        <h2>
          {opportunity.name}
        </h2>

        <span
          style={{

            background:
              getCategoryColor(),

            padding: '8px 14px',

            borderRadius: '20px',

            fontSize: '14px',

            fontWeight: '600'

          }}
        >

          {opportunity.category}

        </span>

      </div>

      <p>

        <strong>Duration:</strong>

        {' '}

        {opportunity.duration}

      </p>

      <p>

        <strong>Start Date:</strong>

        {' '}

        {opportunity.start_date}

      </p>

      <p>

        <strong>Description:</strong>

        {' '}

        {opportunity.description}

      </p>

      <p>

        <strong>Skills:</strong>

        {' '}

        {opportunity.skills}

      </p>

      <p>

        <strong>Future Opportunities:</strong>

        {' '}

        {opportunity.future_opportunities}

      </p>

      <p>

        <strong>Max Applicants:</strong>

        {' '}

        {opportunity.max_applicants}

      </p>

      <div className="card-actions">

        <button
          onClick={() =>
            onEdit(opportunity)
          }
        >

          Edit

        </button>

        <button
          onClick={() =>
            onDelete(opportunity.id)
          }
        >

          Delete

        </button>

      </div>

    </div>
  )
}
