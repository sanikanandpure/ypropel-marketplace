import React, { useState } from "react"
import { Mail, Lock, ArrowRight } from "lucide-react"
import "./Login.css"
import YPropelLogo from '../assets/ypropel_logo.png'

export default function Login() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Email submitted:", email)
    setIsSubmitting(false)
    setEmail("")
  }

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
              <img src={YPropelLogo}/>
            </div>
          </div>

          {/* Heading */}
          <div className="heading-section">
            <h1 className="title">Login to YPropel Marketplace</h1>
            <p className="subtitle">
              Buy, sell, and discover goods--for students, by students.
            </p>
          </div>

          {/* Social Sign-up */}
          <div className="social-buttons">
            <button
              className="social-btn"
              onClick={() => handleSocialSignup("Google")}
            >
              <svg className="social-icon" fill="#4285F4" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.449-11.666l-9.449 0z" />
              </svg>
              Google
            </button>
          </div>

          <div className="separator-container">
            <div className="separator-line"></div>
            <div className="separator-text">
              <span>Or continue with</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="form">
            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="input-icon" />
              </div>
            </div>
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing you up..." : "Sign Up"}
              <ArrowRight className="submit-icon" />
            </button>
          </form>

          {/* Links */}
          <div className="links">
            <a href="#" className="link">Terms</a>
            <a href="#" className="link">Privacy</a>
            <a href="#" className="link">Help</a>
          </div>
        </div>
      </div>
    </div>
  )
}