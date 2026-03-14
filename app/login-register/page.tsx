// app/login-register/page.tsx
'use client';

import { useState } from 'react';
import './login-register.css'; // we'll create this file next

export default function LoginRegister() {
  const [active, setActive] = useState(false);

  return (
    <div className='login'>
  <div className={`wrapper ${active ? 'active' : ''}`}>
      <span className="bg-animate"></span>
      <span className="bg-animate2"></span>

      {/* LOGIN FORM */}
      <div className="form-box login">
        <h2 className="animation" style={{ '--i': 0, '--j': 21 } as any}>Login</h2>
        <form action="#">
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 } as any}>
            <input type="email" required />
            <label>Email</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 } as any}>
            <input type="password" required />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button className="btn animation" type="submit" style={{ '--i': 3, '--j': 24 } as any}>
            Login
          </button>
          <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 } as any}>
            <p>
              Don&apos;t have an account?{' '}
              <a href="#" className="register-link" onClick={(e) => { e.preventDefault(); setActive(true); }}>
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 0, '--j': 20 } as any}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 1, '--j': 21 } as any}>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>

      {/* REGISTER FORM */}
      <div className="form-box register">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 } as any}>Sign Up</h2>
        <form action="#">
          <div className="input-box animation" style={{ '--i': 18, '--j': 1 } as any}>
            <input type="text" required />
            <label>Parent Full Name</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 19, '--j': 2 } as any}>
            <input type="email" required />
            <label>Email</label>
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box animation" style={{ '--i': 20, '--j': 3 } as any}>
            <input type="password" required />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <button className="btn animation" type="submit" style={{ '--i': 21, '--j': 4 } as any}>
            Sign Up
          </button>
          <div className="logreg-link animation" style={{ '--i': 22, '--j': 5 } as any}>
            <p>
              Already have an account?{' '}
              <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); setActive(false); }}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 } as any}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 18, '--j': 1 } as any}>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
    </div>
  
  );
}