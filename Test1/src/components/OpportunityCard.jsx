export default function OpportunityCard({

  opportunity,
  onDelete,
  onEdit

}) {


return (

  <div className="opportunity-card">

    <h2>{opportunity.name}</h2>

  
<p>

  <strong>Category:</strong>

  <span
    style={{
      background:
        opportunity.category === 'Technology'
          ? '#dbeafe'
          : opportunity.category === 'Business'
          ? '#dcfce7'
          : '#f3e8ff',

      color: '#111827',

      padding: '6px 12px',

      borderRadius: '20px',

      marginLeft: '10px',

      fontSize: '14px'
    }}
  >

    {opportunity.category}

  </span>

</p>


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

    <div className="card-actions">

      <button
        onClick={() => onEdit(opportunity)}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(opportunity.id)}
      >
        Delete
      </button>

    </div>

  </div>
)

}
