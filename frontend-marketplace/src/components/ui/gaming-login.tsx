"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Chrome, Twitter, Gamepad2, User, Store } from "lucide-react";

interface GamingAuthProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  error?: string;
  isLoading?: boolean;
  mode: "login" | "register";
  onToggleMode: () => void;
}

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-purple-950/30 to-neutral-950 z-10" />
      <video
        ref={videoRef}
        className="absolute inset-0 min-w-full min-h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

function FormInput({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
      />
    </div>
  );
}

export function GamingAuth({
  onLogin,
  onRegister,
  error,
  isLoading,
  mode,
  onToggleMode,
}: GamingAuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await onLogin(email, password);
    } else {
      await onRegister(name, email, password);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <VideoBackground />

      <div className="relative z-20 w-full max-w-md">
        <div className="p-8 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl shadow-purple-500/5">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20">
              <Gamepad2 className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {mode === "login" ? "Bienvenido de nuevo" : "Crear cuenta"}
            </h2>
            <p className="mt-2 text-sm text-white/50">
              {mode === "login"
                ? "Inicia sesión para continuar en Marketplace Pro"
                : "Únete a la comunidad de Marketplace Pro"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {mode === "register" && (
              <FormInput
                icon={<User size={18} />}
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <FormInput
              icon={<Mail size={18} />}
              type="email"
                placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <FormInput
                icon={<Lock size={18} />}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-200 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "login" ? "Iniciando sesión..." : "Creando cuenta..."}
                </span>
              ) : mode === "login" ? (
                "Iniciar Sesión"
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          {mode === "login" && (
            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 absolute w-full" />
                <span className="relative px-4 text-xs text-white/40">
                  o continúa con
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[{ icon: Chrome, name: "Google" }, { icon: Twitter, name: "X" }, { icon: Gamepad2, name: "Steam" }].map(({ icon: Icon, name }) => (
                  <button
                    key={name}
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    <Icon size={16} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs font-medium text-white/40">Credenciales de Prueba</p>
            <p className="mt-1 text-xs text-white/30">
              Admin: admin@marketplace.com / Admin123!
            </p>
            <p className="text-xs text-white/30">
              Cliente: customer@marketplace.com / Customer123!
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-white/40">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Crear una
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
