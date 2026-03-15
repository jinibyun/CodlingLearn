function MovieCard({ title, posterUrl, rating }) {
  return (
    <article
      style={{
        width: '280px',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#fafbfc',
        color: '#111827',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
      }}
    >
      <img
        src={posterUrl}
        alt={`${title} 포스터`}
        style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ padding: '14px 16px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>{title}</h2>
        <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#4b5563' }}>별점 {rating}개</p>
      </div>
    </article>
  )
}

export default MovieCard
