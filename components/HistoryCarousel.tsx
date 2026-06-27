"use client";

const HistoryCarousel = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f7f7f7',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '4rem',
          margin: 0,
          background: 'linear-gradient(135deg, #0b2f4e, #0077b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Hello World!
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          marginTop: '1rem'
        }}>
          This is the History Carousel (simple version)
        </p>
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            maxWidth: '300px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>📚 2001</h3>
            <p style={{ margin: 0, color: '#666' }}>Opening doors</p>
          </div>
          <div style={{
            background: '#fff',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            maxWidth: '300px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🏆 2026</h3>
            <p style={{ margin: 0, color: '#666' }}>25 years of excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCarousel;