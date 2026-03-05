import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  MapPin,
  ChevronLeft,
  BookOpen,
  Shirt,
  Camera,
  Heart,
  Sparkles,
  Cake,
  Flower2,
  Smartphone,
  Clock,
  ShieldCheck,
  Users,
  Lock,
  Unlock
} from 'lucide-react';
import { cn } from './lib/utils';
import { supabase } from './lib/supabase';


// --- Types ---
type Tab = 'welcome' | 'rsvp' | 'mapa' | 'admin' | 'adminLogin';

// --- Components ---

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-wedding-cream/80 backdrop-blur-md border-b border-stone-200">
    {onBack && (
      <button
        onClick={onBack}
        className="p-2 -ml-2 text-wedding-olive hover:bg-stone-200/50 rounded-full transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
    )}
    {!onBack && <div className="w-8" />}
    <h1 className="text-xl font-serif font-bold text-stone-800 tracking-tight">
      {title}
    </h1>
    <div className="w-8" /> {/* Spacer */}
  </header>
);

const BottomNav = ({ activeTab, onTabChange, isConfirmed }: { activeTab: Tab; onTabChange: (tab: Tab) => void; isConfirmed: boolean }) => {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'rsvp', label: 'Confirmar', icon: CheckCircle2 },
    { id: 'mapa', label: 'Local & Manual', icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 px-12 py-3 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        // Disable mapa if not confirmed yet to enforce "navegação em cadeia"
        const isDisabled = tab.id === 'mapa' && !isConfirmed;

        return (
          <button
            key={tab.id}
            disabled={isDisabled}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-wedding-earth scale-110" : "text-stone-400 hover:text-stone-600",
              isDisabled && "opacity-30 cursor-not-allowed"
            )}
          >
            <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn(
              "text-[10px] font-medium uppercase tracking-wider",
              isActive ? "font-bold" : "font-normal"
            )}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="w-1 h-1 rounded-full bg-wedding-earth mt-0.5"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

// --- Welcome Screen Component ---

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-wedding-cream flex flex-col items-center relative overflow-hidden"
    >
      {/* Photo Header */}
      <div className="w-full h-[55vh] relative">
        <img
          src="/hero.webp"
          alt="Samuel & Lília"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wedding-cream via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 -mt-12 z-10 text-center gap-6">
        <p className="text-stone-600 font-serif italic text-sm max-w-[280px] leading-relaxed">
          "Grandes coisas fez o Senhor por nós, e, por isso, estamos alegres."
          <span className="block mt-1 font-bold not-italic">Salmos 126:3</span>
        </p>

        <div className="space-y-1">
          <h1 className="text-6xl font-script text-wedding-gold">Samuel & Lília</h1>
          <p className="text-stone-500 font-serif uppercase tracking-[0.2em] text-xs">
            Convidam para o seu casamento
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-stone-800 font-serif font-bold text-lg">19 DE ABRIL, 2026 ÀS 14:30</p>
        </div>

        {/* Circular Action Button */}
        <div className="relative mt-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
              />
              <text className="text-[9px] font-serif fill-wedding-gold uppercase tracking-[0.1em] font-bold">
                <textPath xlinkHref="#circlePath">
                  CLIQUE AQUI • CLIQUE AQUI • CLIQUE AQUI • CLIQUE AQUI •
                </textPath>
              </text>
            </svg>
          </motion.div>
          <button
            onClick={onStart}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-wedding-olive/20 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          >
            <img src="/concha_com_circulo.webp" alt="icon" className="w-16 h-16 object-contain group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Wave/Foam Bottom Effect */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-auto translate-y-8 origin-bottom scale-110">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,138.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#ffffff"
            fillOpacity="0.5"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </motion.div>
  );
};

const RSVPScreen = ({ onConfirm, onAdminClick, initialName = '', initialEmail = '' }: { onConfirm: (name: string, email: string) => void; onAdminClick?: () => void; initialName?: string; initialEmail?: string }) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  // Sync with initial values when they are loaded (async)
  React.useEffect(() => {
    if (initialName && !name) setName(initialName);
    if (initialEmail && !email) setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onConfirm(name, email);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center px-6 py-8 pb-24 gap-8"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4 text-wedding-gold">
          <img src="/concha_com_circulo.webp" alt="Concha" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-5xl font-script text-wedding-gold">Confirmação</h2>
        <p className="text-stone-600 text-sm italic font-serif max-w-[240px] mx-auto">
          Por favor, confirme sua presença em nosso casamento na praia
        </p>
      </div>

      <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-wedding-olive/20 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-wedding-gold font-serif text-lg block">Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-wedding-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-olive/20 transition-all font-serif"
            />
          </div>
          <div className="space-y-2">
            <label className="text-wedding-gold font-serif text-lg block">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-wedding-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-olive/20 transition-all font-serif"
            />
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-wedding-earth text-white font-serif text-xl font-bold rounded-xl shadow-lg hover:bg-wedding-earth/90 active:scale-95 transition-all text-center"
        >
          Confirmar Presença
        </button>
      </div>

      <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-md relative">
        <img
          src="/eu e amor.jpg"
          alt="Samuel & Lília"
          className="w-full h-full object-cover"
        />
        {/* Botão Admin Secreto - Agora na tela principal embaixo da foto */}
        {onAdminClick && (
          <button
            onClick={onAdminClick}
            className="absolute bottom-2 right-2 p-2 opacity-0 hover:opacity-100 transition-opacity text-white/50 hover:text-white"
            title="Área dos Noivos"
          >
            <Lock size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const AdminLoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'noivos2026') {
      onLoginSuccess();
    } else {
      setError('Senha incorreta.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center px-6 py-12 gap-8"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <Lock className="text-wedding-olive" size={40} />
        </div>
        <h2 className="text-3xl font-serif text-stone-800">Acesso Restrito</h2>
        <p className="text-stone-500 text-sm">Área exclusiva dos noivos</p>
      </div>

      <form onSubmit={handleLogin} className="w-full bg-white rounded-3xl p-8 shadow-sm border border-stone-100 space-y-6">
        <div className="space-y-2">
          <label className="text-stone-600 font-serif text-sm block">Senha de Acesso</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wedding-olive/20 transition-all font-sans text-center tracking-widest"
            placeholder="••••••••"
          />
          {error && <p className="text-red-500 text-xs text-center mt-2 animate-pulse">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-wedding-olive text-white font-bold rounded-xl shadow-lg hover:bg-wedding-olive/90 transition-all flex justify-center items-center gap-2"
        >
          <Unlock size={18} /> Entrar no Painel
        </button>
      </form>
    </motion.div>
  );
};

const AdminScreen = () => {
  const [guests, setGuests] = useState<{ id: string; nome: string; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { data, error } = await supabase
          .from('convidados')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setGuests(data || []);
      } catch (error) {
        console.error('Erro ao buscar convidados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col px-6 py-8 pb-32 gap-6"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <Users className="text-wedding-gold" size={32} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-800">Painel de Controle</h2>
        <div className="inline-block bg-wedding-olive/10 px-4 py-1 rounded-full">
          <p className="text-wedding-olive font-bold text-sm">
            {loading ? '---' : guests.length} Confirmados
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-stone-400">Carregando dados...</div>
        ) : guests.length === 0 ? (
          <div className="text-center py-10 text-stone-400 font-serif italic">Nenhum convidado confirmado ainda.</div>
        ) : (
          guests.map((guest) => (
            <div key={guest.id} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-serif font-bold text-stone-800">{guest.nome}</span>
                <span className="text-xs text-stone-400">{guest.email}</span>
              </div>
              <div className="text-[10px] text-stone-300">
                {new Date(guest.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

const MapaManualScreen = ({ confirmationDate, guestName }: { confirmationDate?: string | null; guestName?: string }) => {
  const manualItems = [
    {
      title: "Fotografia",
      description: "Respeite o trabalho dos fotógrafos e evite circular à frente deles.",
      icon: Camera
    },
    {
      title: "Presença",
      description: "Viva a cerimônia com atenção e presença, cada momento é único.",
      icon: Heart
    },
    {
      title: "Celebração",
      description: "Aproveite a celebração com alegria e leve boas memórias com você.",
      icon: Sparkles
    },
    {
      title: "Mesa de Doces",
      description: "Aguarde o momento indicado para a liberação da mesa de doces.",
      icon: Cake
    },
    {
      title: "Decoração",
      description: "A decoração faz parte do sonho dos noivos, pedimos que não a retire.",
      icon: Flower2
    },
    {
      title: "Dress Code",
      description: "Nossa cerimônia vai acontecer na praia, por isso moças, evitem saltos e optem por vestidos com tecidos mais fluidos e rapazes evitem trajes quentes, optem por vestes mais leves.",
      icon: Shirt
    },
    {
      title: "Celulares",
      description: "Mantenha o celular no silencioso durante a cerimônia.",
      icon: Smartphone
    },
    {
      title: "Pontualidade",
      description: "Seja pontual para não perder os momentos mais especiais.",
      icon: Clock
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center px-6 py-8 pb-24 gap-8"
    >
      {/* Seção Mapa */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="text-wedding-gold" size={24} />
          <h2 className="text-2xl font-serif font-bold text-stone-800">Localização</h2>
        </div>

        <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white relative">
          <img
            src="/frente do espaço.png"
            alt="Local do Casamento"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-stone-100">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-tighter text-stone-800">Cerimônia</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex items-start gap-4">
          <div className="flex items-center justify-center w-16 h-16 shrink-0">
            <img src="/concha_com_circulo.webp" alt="Concha" className="w-14 h-14 object-contain" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-stone-800">Cerimônia na Praia</h3>
            <p className="text-wedding-earth font-medium text-sm">R. Benjamin de Souza, 111 - São Tomé</p>
            <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Dia do casamento: domingo, 19 de Abril de 2026. às 14;30</p>
          </div>
        </div>

        {confirmationDate && (
          <div className="bg-green-50 rounded-2xl p-4 border border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600 shrink-0" size={18} />
              <span className="text-green-800 font-bold text-sm">
                {guestName ? `${guestName.split(' ')[0]}, sua presença está confirmada! 🥂` : 'Sua presença está confirmada! 🥂'}
              </span>
            </div>
            <span className="text-green-600 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
              Em: {new Date(confirmationDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Seção Manual */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-wedding-gold" size={24} />
          <h2 className="text-2xl font-serif font-bold text-stone-800">Manual dos Convidados</h2>
        </div>

        <div className="grid gap-4">
          {manualItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
                <div className="p-3 bg-wedding-cream rounded-xl">
                  <Icon className="text-wedding-olive" size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif font-bold text-stone-800">{item.title}</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <a
        href="https://maps.app.goo.gl/tX5umeh5gGncxpjN9"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 bg-wedding-olive text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-wedding-olive/90 transition-all"
      >
        <MapPin size={20} />
        Ver no Google Maps
      </a>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = React.useState<Tab>('welcome');
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [guestName, setGuestName] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [confirmationDate, setConfirmationDate] = React.useState<string | null>(null);
  const [isReturning, setIsReturning] = React.useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(false);
  const [appLoading, setAppLoading] = React.useState(true);

  // Load saved guest info on mount
  React.useEffect(() => {
    const loadSavedGuest = async () => {
      setAppLoading(true);
      try {
        const savedName = localStorage.getItem('wedding_guest_name');
        const savedEmail = localStorage.getItem('wedding_guest_email');

        if (savedName && savedEmail) {
          setGuestName(savedName);
          setGuestEmail(savedEmail);

          const { data, error } = await supabase
            .from('convidados')
            .select('*')
            .eq('email', savedEmail)
            .limit(1);

          if (data && data.length > 0) {
            const guestData = data[0];
            setGuestName(guestData.nome);
            setGuestEmail(guestData.email);
            setConfirmationDate(guestData.created_at);
            setIsReturning(true);
          }
          if (error) console.error('Erro Supabase:', error);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setAppLoading(false);
      }
    };

    loadSavedGuest();
  }, []);

  // Sequential Redirection Logic
  React.useEffect(() => {
    let timer: number;
    if (isConfirmed) {
      timer = window.setTimeout(() => {
        setActiveTab('mapa');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isConfirmed]);

  const handleConfirm = async (name: string, email: string) => {
    try {
      console.log('Confirmando:', { name, email });

      // Manual "Upsert" logic
      const { data: existingGuests, error: fetchError } = await supabase
        .from('convidados')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (fetchError) throw fetchError;

      const existingGuest = existingGuests && existingGuests.length > 0 ? existingGuests[0] : null;

      setIsReturning(!!existingGuest); // Real-time check for the message type

      let result;
      if (existingGuest) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('convidados')
          .update({ nome: name })
          .eq('email', email)
          .select();

        if (updateError) throw updateError;
        result = updateData && updateData.length > 0 ? updateData[0] : null;
      } else {
        // Insert new
        const { data: insertData, error: insertError } = await supabase
          .from('convidados')
          .insert([{ nome: name, email: email }])
          .select();

        if (insertError) throw insertError;
        result = insertData && insertData.length > 0 ? insertData[0] : null;
      }

      const finalData = result || { nome: name, email: email, created_at: new Date().toISOString() };

      setGuestName(name);
      setGuestEmail(email);
      setConfirmationDate(finalData.created_at);
      setIsConfirmed(true);

      localStorage.setItem('wedding_guest_name', name);
      localStorage.setItem('wedding_guest_email', email);
    } catch (error: any) {
      console.error('Erro:', error);
      alert(`Erro: ${error.message || 'Houve um problema. Tente novamente.'}`);
    }
  };

  const onTabChange = (tab: Tab) => {
    if (tab === 'rsvp') {
      setIsConfirmed(false); // Permite ver o formulário novamente
    }
    setActiveTab(tab);
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center p-6 gap-4">
        <motion.img
          src="/concha_com_circulo.webp"
          alt="Carregando"
          className="w-20 h-20 object-contain"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-wedding-olive font-serif italic">Preparando seu convite...</p>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setActiveTab('rsvp')} />;
      case 'rsvp':
        return isConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center px-6 py-20 text-center gap-6"
          >
            <div className="w-24 h-24 bg-wedding-olive/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-wedding-olive" size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-wedding-olive">
                {isReturning ? 'Bem vindo de volta!' : `Obrigado!`}
              </h2>
              <p className="text-stone-600 italic font-serif leading-relaxed">
                {isReturning
                  ? "confira novamente e quantas vez for preciso, mas não deixe de se preparar para esse grande dia!"
                  : `${guestName}, sua presença foi confirmada com sucesso.`}
              </p>
            </div>
            <p className="text-stone-300 text-[10px] uppercase tracking-widest animate-pulse">
              Redirecionando para o manual em instantes...
            </p>
          </motion.div>
        ) : (
          <RSVPScreen
            onConfirm={handleConfirm}
            initialName={guestName}
            initialEmail={guestEmail}
            onAdminClick={() => setActiveTab(isAdminAuthenticated ? 'admin' : 'adminLogin')}
          />
        );
      case 'mapa':
        return <MapaManualScreen confirmationDate={confirmationDate} guestName={guestName} />;
      case 'adminLogin':
        return <AdminLoginScreen onLoginSuccess={() => { setIsAdminAuthenticated(true); setActiveTab('admin'); }} />;
      case 'admin':
        if (!isAdminAuthenticated) {
          // Redireciona sutilmente para o login se tentar burlar
          setTimeout(() => setActiveTab('adminLogin'), 0);
          return null;
        }
        return <AdminScreen />;
      default:
        return <RSVPScreen onConfirm={handleConfirm} onAdminClick={() => setActiveTab(isAdminAuthenticated ? 'admin' : 'adminLogin')} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-wedding-cream relative shadow-2xl overflow-x-hidden">
      {activeTab !== 'welcome' && (
        <Header
          title="Samuel & Lília"
          onBack={activeTab !== 'rsvp' ? () => onTabChange('rsvp') : undefined}
        />
      )}

      <main className="relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      {activeTab !== 'welcome' && (
        <BottomNav
          activeTab={activeTab === 'admin' || activeTab === 'adminLogin' ? 'rsvp' : activeTab}
          onTabChange={onTabChange}
          isConfirmed={isConfirmed || isReturning} // Permite acessar manual se já for um conhecido
        />
      )}
    </div>
  );
}
