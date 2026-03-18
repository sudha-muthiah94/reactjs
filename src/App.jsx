import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setErrors({})
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800))

    setIsLoading(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="login-container">
      {/* Animated background orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className={`login-card ${shake ? 'shake' : ''}`}>
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-icon">🚀</div>
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your dashboard</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <div className="error-message">⚠ {errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">⚠ {errors.password}</div>
            )}
          </div>

          {/* Options */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            <span className="btn-content">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </span>
          </button>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <button type="button" className="social-btn">
              <span className="social-icon">G</span>
              Google
            </button>
            <button type="button" className="social-btn">
              <span className="social-icon">🐙</span>
              GitHub
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Login Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
