// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/LoginPage.css';
import { login } from '../services/api';

// Import icons - using existing ones as placeholders
import ocpLogoIcon from '../components/images/ocp_logo.png';
import userIcon from '../components/images/ico/usrs.png';
import lockIcon from '../components/images/ico/chk.png';
import eyeIcon from '../components/images/ico/chk.png';
import eyeOffIcon from '../components/images/ico/chk.png';
import checkIcon from '../components/images/ico/chk.png';
import alertIcon from '../components/images/ico/chk.png';
import xIcon from '../components/images/ico/chk.png';
import shieldIcon from '../components/images/ico/chk.png';
import usersManagementIcon from '../components/images/ico/usrs.png';
import arrowLeftIcon from '../components/images/ico/chk.png';
import loadingIcon from '../components/images/ico/chk.png';

// Background image - you can replace with your actual background
const backgroundImage = "https://images.unsplash.com/photo-1718386046338-6259e822aa4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmR1c3RyaWFsJTIwZmFjaWxpdHklMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODU1OTQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

function LoginPage() {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Validation states
  const [emailValid, setEmailValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    const password = formData.password;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    if (!emailValid) {
      setError('Veuillez entrer une adresse email valide');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    try {
      // Call your login API
      const response = await login({
        email: formData.email,
        password: formData.password
      });
      
      // Store the token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberLogin', 'true');
      }
      
      setShowSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1500);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  // Get password strength text and class
  const getPasswordStrengthInfo = () => {
    if (passwordStrength <= 25) return { text: 'Faible', class: 'weak' };
    if (passwordStrength <= 50) return { text: 'Moyen', class: 'medium' };
    if (passwordStrength <= 75) return { text: 'Fort', class: 'strong' };
    return { text: 'Très fort', class: 'very-strong' };
  };

  // Generate background particles
  const renderParticles = () => {
    return Array.from({ length: 10 }, (_, i) => (
      <div key={i} className="particle" />
    ));
  };

  const passwordInfo = getPasswordStrengthInfo();

  return (
    <div className="login-page">
      
      {/* Background Image */}
      <div className="login-background">
        <img src={backgroundImage} alt="Modern industrial facility background" />
      </div>
      
      {/* Overlay Gradients */}
      <div className="login-overlay"></div>
      <div className="login-overlay-secondary"></div>
      
      {/* Animated Background Particles */}
      <div className="background-particles">
        {renderParticles()}
      </div>
      
      {/* Geometric Pattern Overlay */}
      <div className="geometric-pattern"></div>

      {/* Main Content */}
      <div className="login-content">
        
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div>
            <div className="brand-header">
              <div className="brand-logo">
                <img src={ocpLogoIcon} alt="OCP Logo" />
              </div>
              <div className="brand-text">
                <h1>OCP</h1>
                <p>Gestion Astreinte</p>
              </div>
            </div>
            
            <div className="brand-description">
              <h2>
                Système de Gestion<br />
                <span className="highlight">des Astreintes</span>
              </h2>
              <p>
                Plateforme sécurisée pour la gestion des équipes d'astreinte 
                et la planification des interventions au sein du groupe OCP.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon security">
                <img src={shieldIcon} alt="Security" />
              </div>
              <div className="feature-content">
                <h3>Sécurité Renforcée</h3>
                <p>Authentification multi-facteurs</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon management">
                <img src={usersManagementIcon} alt="Management" />
              </div>
              <div className="feature-content">
                <h3>Gestion Centralisée</h3>
                <p>Interface unifiée pour tous les sites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-card">
            
            {/* Success Overlay */}
            {showSuccess && (
              <div className="success-overlay active">
                <div className="success-icon">
                  <img src={checkIcon} alt="Success" />
                </div>
              </div>
            )}
            
            {/* Card Header */}
            <div className="login-header">
              <div className="login-logo">
                <img src={ocpLogoIcon} alt="OCP Logo" />
              </div>
              <h1 className="login-title">Connexion</h1>
              <p className="login-subtitle">
                Accédez à votre espace de gestion des astreintes
              </p>
            </div>

            {/* Form Content */}
            <div className="login-form-content">
              <form onSubmit={handleSubmit} className="form-container">
                
                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Adresse email</span>
                    {formData.email && (
                      <div className={`validation-icon ${formData.email ? 'show' : ''} ${emailValid ? 'valid' : 'invalid'}`}>
                        <img 
                          src={emailValid ? checkIcon : xIcon} 
                          alt={emailValid ? 'Valid' : 'Invalid'} 
                        />
                      </div>
                    )}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${formData.email ? (emailValid ? 'valid' : 'invalid') : ''}`}
                      placeholder="nom.prenom@ocp.ma"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label className="form-label">Mot de passe</label>
                  <div className="input-wrapper">
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-input"
                        placeholder="Entrez votre mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        <img 
                          src={showPassword ? eyeOffIcon : eyeIcon} 
                          alt={showPassword ? 'Hide' : 'Show'} 
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className={`password-strength ${formData.password ? 'show' : ''}`}>
                      <div className="strength-header">
                        <span className="strength-label">Force du mot de passe:</span>
                        <span className={`strength-value ${passwordInfo.class}`}>
                          {passwordInfo.text}
                        </span>
                      </div>
                      <div className="strength-bar">
                        <div 
                          className={`strength-progress ${passwordInfo.class}`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="checkbox-input"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="rememberMe" className="checkbox-label">
                    Se souvenir de moi
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    <img src={alertIcon} alt="Error" className="error-icon" />
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading || !emailValid || !formData.password}
                >
                  <div className="button-shimmer"></div>
                  <div className="button-content">
                    {isLoading && <img src={loadingIcon} alt="Loading" className="loading-icon" />}
                    <span>{isLoading ? 'Connexion...' : 'Se connecter'}</span>
                  </div>
                </button>
              </form>

              {/* Footer Links */}
              <div className="login-footer">
                <div className="footer-links">
                  <a href="#forgot" className="forgot-password">
                    Mot de passe oublié ?
                  </a>
                  <div className="support-text">
                    Besoin d'aide ? Contactez le{" "}
                    <span className="support-link">support IT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Homepage */}
          <div className="back-to-home">
            <button onClick={handleBackToHome} className="back-button">
              <img src={arrowLeftIcon} alt="Back" className="back-icon" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Logo */}
      <div className="mobile-logo">
        <div className="mobile-brand">
          <div className="mobile-brand-logo">
            <img src={ocpLogoIcon} alt="OCP Logo" />
          </div>
          <div className="mobile-brand-text">
            <h1>OCP</h1>
            <p>Gestion Astreinte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;