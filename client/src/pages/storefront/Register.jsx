import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import { useAuth } from '../../context/AuthContext';
import '../../styles/storefront.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await register(firstName, lastName, email, password);
    if (res.success) {
      navigate('/account');
    } else {
      setError(res.error || 'Failed to register');
    }
    setLoading(false);
  };

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 24, textAlign: 'center' }}>Create Account</h1>
        
        {error && <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: 4, marginBottom: 20, fontSize: 14 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--brand-border)', borderRadius: 4, fontSize: 14 }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--brand-border)', borderRadius: 4, fontSize: 14 }} 
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid var(--brand-border)', borderRadius: 4, fontSize: 14 }} 
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid var(--brand-border)', borderRadius: 4, fontSize: 14 }} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--brand-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--brand-dark)', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
