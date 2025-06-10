import React, { useState } from "react"
import { Mail, Lock, ArrowRight } from "lucide-react"
import "./Login.css"
import YPropelLogo from '../assets/ypropel_logo.png'
import { useNavigate } from "react-router-dom"

import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, provider } from "../firebase-config"  // adjust path if needed
 

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSocialSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("Logged in with Google:", user)
      // redirect or set user context here
      navigate("/dashboard")
    } catch (err) {
      console.error("Google login error:", err)
      setFeedback("Google login failed. Please try again.")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback("")

    // Basic validation
    if (!email || !password) {
      setFeedback("Please enter both email and password")
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setFeedback("Password must be at least 6 characters long")
      setIsSubmitting(false)
      return
    }

    console.log("Attempting to sign in with:", email) // Debug log
  
    try {
      // Try to sign in first
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setFeedback("Signed in!")
      console.log("Signed in:", userCredential.user)
      setEmail("")
      setPassword("")
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate("/dashboard")
      }, 100)

    } catch (err) {
      console.error("Login error:", err.code, err.message)
      
      // Handle specific error cases
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        // Try to create account if user doesn't exist or credentials are invalid
        try {
          console.log("Attempting to create new account...")
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          console.log("Account created:", userCredential.user)
          setFeedback("Account created and signed in!")
          setEmail("")
          setPassword("")
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            navigate("/dashboard")
          }, 100)
        } catch (signupError) {
          console.error("Signup error:", signupError.code, signupError.message)
          setFeedback(getErrorMessage(signupError.code))
        }
      } else {
        setFeedback(getErrorMessage(err.code))
      }
    }
  
    setIsSubmitting(false)
  }

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials."
      case "auth/wrong-password":
        return "Wrong email or password"
      case "auth/user-not-found":
        return "No account found with this email"
      case "auth/invalid-email":
        return "Invalid email address"
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case "auth/email-already-in-use":
        return "An account with this email already exists"
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later."
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection."
      default:
        return `Error: ${errorCode}. Please try again.`
    }
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
              onClick={handleSocialSignup}
              type="button"
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

            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="email-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="input-icon" />
              </div>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing you up..." : "Continue"}
              <ArrowRight className="submit-icon" />
            </button>
           

            {feedback && (
              <div
                className="feedback-text"
                style={{ 
                  color: feedback.includes("Signed in") || feedback.includes("Account created") ? "green" : "red", 
                  marginTop: "0.75rem" 
                }}
              >
                {feedback}
              </div>
            )}
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