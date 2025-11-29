// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../components/styles/LoginPage.css';
import backgroundImage from '../components/images/zellige .jpg';
import ocpLogoIcon from '../components/images/ocp_logo.png';

// React icons from lucide-react
import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Users,
  ArrowLeft,
  Loader2
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();


  // States
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validate email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);

  // Password strength
  useEffect(() => {
    let strength = 0;
    const password = formData.password;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  // useEffect(() => {
  //   if (user && token) {
  //     // We show the success animation
  //     setShowSuccess(true);
  //     // After a short delay, we navigate to the correct dashboard
  //     const timer = setTimeout(() => {
  //       if (user.role === 'admin') {
  //         navigate('/app', { replace: true });
  //       } else if (user.role === 'secretaire') {
  //         navigate('/secretary/dashboard', { replace: true });
  //       } else {
  //         navigate('/', { replace: true }); // Fallback
  //       }
  //     }, 1500); // 1.5 seconds for the animation
      
  //     // Cleanup function to prevent issues if the component unmounts early
  //     return () => clearTimeout(timer);
  //   }
  // }, [user, token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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
      const response = await apiLogin({
        email: formData.email,
        password: formData.password,
      });

      // Call the global login function to update the state
      login(response.data.user, response.data.access_token);
      
      // After a successful login, we decide where to go
      if (response.data.user.role === 'admin') {
        navigate('/app', { replace: true });
      } else if (response.data.user.role === 'secretaire') {
        navigate('/secretary/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true }); // Fallback to homepage
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => navigate('/');

  const getPasswordStrengthInfo = () => {
    if (passwordStrength <= 25) return { text: 'Faible', class: 'weak' };
    if (passwordStrength <= 50) return { text: 'Moyen', class: 'medium' };
    if (passwordStrength <= 75) return { text: 'Fort', class: 'strong' };
    return { text: 'Très fort', class: 'very-strong' };
  };

  const renderParticles = () => Array.from({ length: 10 }, (_, i) => <div key={i} className="particle" />);

  const passwordInfo = getPasswordStrengthInfo();

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-background">
        <img src={backgroundImage} alt="background" />
      </div>
      <div className="login-overlay"></div>
      <div className="login-overlay-secondary"></div>
      <div className="background-particles">{renderParticles()}</div>

      <div className="login-content">
        {/* Left side - branding */}
        <div className="login-branding">
          <div>
            <div className="brand-header">
              <div className="brand-logo">
                {/* <ocpLogoIcon /> */}
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
              <p>Plateforme sécurisée pour la gestion des équipes d'astreinte et la planification des interventions.</p>
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon security">
                <ShieldCheck size={28} />
              </div>
              <div className="feature-content">
                <h3>Sécurité Renforcée</h3>
                <p>Authentification multi-facteurs</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon management">
                <Users size={28} />
              </div>
              <div className="feature-content">
                <h3>Gestion Centralisée</h3>
                <p>Interface unifiée pour tous les sites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - form */}
        <div className="login-form-container">
          <div className="login-card">
            {showSuccess && (
              <div className="success-overlay active">
                <div className="success-icon">
                  <CheckCircle size={64} color="green" />
                </div>
              </div>
            )}

            <div className="login-header">
              <div className="login-logo">
                {/* <ShieldCheck size={40} /> */}
                <img src={ocpLogoIcon} alt="OCP Logo" />
              </div>
              <h1 className="login-title">Connexion</h1>
              <p className="login-subtitle">Accédez à votre espace de gestion</p>
            </div>

            <div className="login-form-content">
              <form onSubmit={handleSubmit} className="form-container">
                {/* Email */}
                <div className="form-group">
                  <label className="form-label">
                    Adresse email
                    {formData.email && (
                      <div className={`validation-icon ${emailValid ? 'valid' : 'invalid'}`}>
                        {emailValid ? <CheckCircle size={18} color="green" /> : <XCircle size={18} color="red" />}
                      </div>
                    )}
                  </label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${emailValid ? 'valid' : 'invalid'}`}
                      placeholder="nom.prenom@ocp.ma"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label">Mot de passe</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
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
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {formData.password && (
                    <div className={`password-strength show`}>
                      <div className="strength-header">
                        <span>Force du mot de passe:</span>
                        <span className={`strength-value ${passwordInfo.class}`}>{passwordInfo.text}</span>
                      </div>
                      <div className="strength-bar">
                        <div className={`strength-progress ${passwordInfo.class}`} style={{ width: `${passwordStrength}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember me */}
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="checkbox-input"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="rememberMe">Se souvenir de moi</label>
                </div>

                {/* Error */}
                {error && (
                  <div className="error-message">
                    <AlertCircle size={18} color="red" className="error-icon" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" className="submit-button" disabled={isLoading || !emailValid || !formData.password}>
                  {isLoading ? <Loader2 size={18} className="loading-icon animate-spin" /> : null}
                  <span>{isLoading ? 'Connexion...' : 'Se connecter'}</span>
                </button>
              </form>

              {/* Footer */}
              <div className="login-footer">
                <a href="#forgot" className="forgot-password">
                  Mot de passe oublié ?
                </a>
                <div className="support-text">
                  Besoin d'aide ? Contactez le <span className="support-link">support IT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="back-to-home">
            <button onClick={handleBackToHome} className="back-button">
              <ArrowLeft size={18} />
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
