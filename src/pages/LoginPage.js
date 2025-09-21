// src/components/LoginPage.js
import React, { useState } from 'react';
import './styles/LoginPage.css';

// Import icon images (add these when you upload the icons)
import ocpLogoIcon from './images/icons/ocp-logo.png';
import userIcon from './images/icons/user.png';
import lockIcon from './images/icons/lock.png';
import eyeIcon from './images/icons/eye.png';
import eyeOffIcon from './images/icons/eye-off.png';
import microsoftIcon from './images/icons/microsoft.png';
import googleIcon from './images/icons/google.png';
import checkIcon from './images/icons/check.png';
import alertIcon from './images/icons/alert-triangle.png';
import xIcon from './images/icons/x-circle.png';

// Icon components
const OCPLogo = ({ className, style }) => (
  <img 
    src={ocpLogoIcon} 
    alt="OCP Logo" 
    className={className}
    style={style}
  />
);

const UserIcon = ({ className, style }) => (
  <img 
    src={userIcon} 
    alt="User" 
    className={className}
    style={style}
  />
);

const LockIcon = ({ className, style }) => (
  <img 
    src={lockIcon} 
    alt="Lock" 
    className={className}
    style={style}
  />
);

const EyeIcon = ({ className, style }) => (
  <img 
    src={eyeIcon} 
    alt="Show Password" 
    className={className}
    style={style}
  />
);

const EyeOffIcon = ({ className, style }) => (
  <img 
    src={eyeOffIcon} 
    alt="Hide Password" 
    className={className}
    style={style}
  />
);

const MicrosoftIcon = ({ className, style }) => (
  <img 
    src={microsoftIcon} 
    alt="Microsoft" 
    className={className}
    style={style}
  />
);

const GoogleIcon = ({ className, style }) => (
  <img 
    src={googleIcon} 
    alt="Google" 
    className={className}
    style={style}
  />
);

const CheckIcon = ({ className, style }) => (
  <img 
    src={checkIcon} 
    alt="Success" 
    className={className}
    style={style}
  />
);

const AlertIcon = ({ className, style }) => (
  <img 
    src={alertIcon} 
    alt="Warning" 
    className={className}
    style={style}
  />
);

const XIcon = ({ className, style }) => (
  <img 
    src={xIcon} 
    alt="Error" 
    className={className}
    style={style}
  />
);

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

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
    setIsLoading(true);
    setStatusMessage(null);

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/error based on form data
      if (formData.email && formData.password.length >= 6) {
        setStatusMessage({
          type: 'success',
          message: 'Connexion réussie! Redirection en cours...'
        });
        
        // Redirect after success message
        setTimeout(() => {
          // window.location.href = '/dashboard';
          console.log('Redirecting to dashboard...');
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          message: 'Email ou mot de passe incorrect'
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Erreur de connexion. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle alternative login methods
  const handleAltLogin = (provider) => {
    setStatusMessage({
      type: 'warning',
      message: `Connexion avec ${provider} temporairement indisponible`
    });
  };

  // Render status message
  const renderStatusMessage = () => {
    if (!statusMessage) return null;

    const icons = {
      success: CheckIcon,
      error: XIcon,
      warning: AlertIcon
    };

    const IconComponent = icons[statusMessage.type];

    return (
      <div className={`status-message status-${statusMessage.type}`}>
        <IconComponent className="status-icon" />
        {statusMessage.message}
      </div>
    );
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Header Section */}
        <div className="login-header">
          <div className="login-logo">
            <OCPLogo />
          </div>
          <h1 className="login-title">Connexion OCP</h1>
          <p className="login-subtitle">
            Accédez à votre système de gestion des astreintes
          </p>
        </div>

        {/* Status Message */}
        {renderStatusMessage()}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <div className="input-container">
              <UserIcon className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="votre.email@ocpgroup.ma"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de Passe
            </label>
            <div className="input-container">
              <LockIcon className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
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
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Form Options */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                className="remember-checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="remember-label">Se souvenir de moi</span>
            </label>
            <a href="#forgot" className="forgot-password">
              Mot de passe oublié?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <div className="divider-line"></div>
          <span className="divider-text">ou continuer avec</span>
          <div className="divider-line"></div>
        </div>

        {/* Alternative Login Methods */}
        <div className="alt-login">
          <button
            type="button"
            className="alt-login-button"
            onClick={() => handleAltLogin('Microsoft')}
          >
            <div className="alt-login-icon">
              <MicrosoftIcon />
            </div>
            Connexion Microsoft 365
          </button>
          
          <button
            type="button"
            className="alt-login-button"
            onClick={() => handleAltLogin('Google')}
          >
            <div className="alt-login-icon">
              <GoogleIcon />
            </div>
            Connexion Google Workspace
          </button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="signup-link">
            Première connexion? <a href="#help">Guide de démarrage</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;