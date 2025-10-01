import './StarRating.css'

const StarRating = ({ rating, maxStars = 5 }) => {
  const stars = []
  
  for (let i = 1; i <= maxStars; i++) {
    const fillPercentage = Math.min(Math.max(rating - i + 1, 0), 1) * 100
    
    stars.push(
      <div key={i} className='star-container'>
        <div className='star-background'>★</div>
        <div 
          className='star-filled' 
          style={{ width: `${fillPercentage}%` }}
        >
          ★
        </div>
      </div>
    )
  }

  return <div className='star-rating'>{stars}</div>
}

export default StarRating