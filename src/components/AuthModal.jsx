import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  BookOpen, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Signup Form State
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  if (!isOpen) return null;

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setDemoMessage('¡Modo demostración visual! La lógica de autenticación backend se conectará próximamente.');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setDemoMessage('Las contraseñas no coinciden. Por favor verifica los datos.');
      return;
    }
    setDemoMessage('¡Modo demostración visual! Tu cuenta fue simulada correctamente.');
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setDemoMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-[460px] glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative my-auto">
        
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 z-10 bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white p-2 rounded-full transition-all cursor-pointer"
          onClick={onClose}
          title="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="px-7 pt-8 pb-6 text-center border-b border-white/6 bg-gradient-to-b from-manhwa/10 to-transparent">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-manhwa to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] border border-white/20">
            <BookOpen className="text-white" size={28} />
          </div>
          <h2 key={`title-${authMode}`} className="text-2xl font-bold text-white tracking-tight animate-form-switch">
            {authMode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h2>
          <p key={`sub-${authMode}`} className="text-sm text-gray-400 mt-1 animate-form-switch">
            {authMode === 'login' 
              ? 'Ingresa para gestionar tu lista de lectura personal' 
              : 'Únete a Save-Readings y guarda tus series favoritas'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-black/40 p-1.5 rounded-xl border border-white/6 mt-6">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-manhwa to-violet-700 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => switchMode('login')}
            >
              <LogIn size={15} />
              <span>Iniciar Sesión</span>
            </button>

            <button
              type="button"
              className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-manhwa to-violet-700 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => switchMode('signup')}
            >
              <UserPlus size={15} />
              <span>Registrarse</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-7">
          {/* Demo Alert Message */}
          {demoMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-manhwa/15 border border-manhwa/30 text-gray-200 text-xs flex items-start gap-2.5 leading-relaxed animate-form-switch">
              <CheckCircle2 size={16} className="text-manhwa flex-shrink-0 mt-0.5" />
              <span>{demoMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form key="login-form" onSubmit={handleLoginSubmit} className="flex flex-col gap-4 animate-form-switch">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setDemoMessage('Función de recuperación disponible próximamente.')}
                    className="text-xs text-manhwa hover:underline cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2.5 mt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  className="w-4 h-4 rounded bg-bg-input border-white/10 text-manhwa focus:ring-manhwa/30 cursor-pointer accent-purple-600"
                />
                <label htmlFor="rememberMe" className="text-xs text-gray-400 select-none cursor-pointer">
                  Recordarme en este dispositivo
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-manhwa to-violet-700 text-white font-bold py-3 px-5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:brightness-110 hover:translate-y-[-1px] active:translate-y-0 transition-all cursor-pointer border border-white/10"
              >
                <span>Iniciar Sesión</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'signup' && (
            <form key="signup-form" onSubmit={handleSignupSubmit} className="flex flex-col gap-4 animate-form-switch">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Nombre Completo / Usuario
                </label>
                <div className="relative flex items-center">
                  <User size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Tu nombre o alias"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Confirmar Contraseña
                </label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-gray-500 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    placeholder="Repite tu contraseña"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="w-full bg-bg-input border border-white/8 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-manhwa focus:ring-2 focus:ring-manhwa/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    title={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2.5 mt-1">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  required
                  checked={signupData.acceptTerms}
                  onChange={handleSignupChange}
                  className="w-4 h-4 rounded bg-bg-input border-white/10 text-manhwa focus:ring-manhwa/30 cursor-pointer accent-purple-600"
                />
                <label htmlFor="acceptTerms" className="text-xs text-gray-400 select-none cursor-pointer">
                  Acepto los <span className="text-manhwa hover:underline">Términos del servicio</span> y la <span className="text-manhwa hover:underline">Privacidad</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-manhwa to-violet-700 text-white font-bold py-3 px-5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:brightness-110 hover:translate-y-[-1px] active:translate-y-0 transition-all cursor-pointer border border-white/10"
              >
                <span>Crear Cuenta</span>
                <UserPlus size={18} />
              </button>
            </form>
          )}

          {/* Social Auth Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative px-3 text-xs uppercase tracking-wider text-gray-500 bg-[#0f1016] font-semibold">
              O continúa con
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDemoMessage('Conexión con Google disponible próximamente.')}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/8 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9c-.8-1.2-1.2-2.6-1.2-4z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => setDemoMessage('Conexión con GitHub disponible próximamente.')}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/8 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 bg-black/30 border-t border-white/6 text-center text-xs text-gray-400">
          {authMode === 'login' ? (
            <p>
              ¿No tienes una cuenta aún?{' '}
              <button 
                type="button" 
                onClick={() => switchMode('signup')}
                className="text-manhwa font-semibold hover:underline cursor-pointer"
              >
                Regístrate gratis
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta registrada?{' '}
              <button 
                type="button" 
                onClick={() => switchMode('login')}
                className="text-manhwa font-semibold hover:underline cursor-pointer"
              >
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
