import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  MapPin,
  ChevronLeft,
  Ship,
  BookOpen,
  Shirt,
  Camera,
  Heart,
  Sparkles,
  Cake,
  Flower2,
  Smartphone,
  Clock
} from 'lucide-react';
import { cn } from './lib/utils';
import { supabase } from './lib/supabase';


// --- Types ---
type Tab = 'rsvp' | 'mapa';

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

const RSVPScreen = ({ onConfirm }: { onConfirm: (name: string, email: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
        <div className="flex justify-center mb-4">
          <Ship className="text-wedding-olive" size={40} />
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

      <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-md">
        <img
          src="/eu e amor.jpg"
          alt="Samuel & Lília"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

const MapaManualScreen = () => {
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
          <div className="p-4 bg-wedding-cream rounded-2xl">
            <Ship className="text-wedding-olive" size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-stone-800">Cerimônia na Praia</h3>
            <p className="text-wedding-earth font-medium text-sm">R. Benjamin de Souza, 111 - São Tomé, 14:30</p>
            <p className="text-stone-400 text-xs uppercase tracking-widest">Domingo, 19 de Abril de 2026</p>
          </div>
        </div>
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
  const [activeTab, setActiveTab] = React.useState<Tab>('rsvp');
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [guestName, setGuestName] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');

  // Load saved guest info on mount
  React.useEffect(() => {
    const loadSavedGuest = async () => {
      const savedName = localStorage.getItem('wedding_guest_name');
      const savedEmail = localStorage.getItem('wedding_guest_email');

      if (savedName && savedEmail) {
        setGuestName(savedName);
        setGuestEmail(savedEmail);
        setIsConfirmed(true);
        setActiveTab('mapa');

        // Verify if record exists in Supabase (optional, but good for sync)
        try {
          const { data } = await supabase
            .from('convidados')
            .select('*')
            .eq('email', savedEmail)
            .single();

          if (data) {
            setGuestName(data.nome);
          }
        } catch (error) {
          console.error('Erro ao sincronizar com o Supabase:', error);
        }
      }
    };

    loadSavedGuest();
  }, []);

  const handleConfirm = async (name: string, email: string) => {
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('convidados')
        .insert([{ nome: name, email: email }]);

      if (error) throw error;

      setGuestName(name);
      setGuestEmail(email);
      setIsConfirmed(true);

      // Keep local copy for quick access
      localStorage.setItem('wedding_guest_name', name);
      localStorage.setItem('wedding_guest_email', email);

      // Navegação em cadeia: após confirmar, vai para o mapa
      setTimeout(() => {
        setActiveTab('mapa');
      }, 1500);
    } catch (error) {
      console.error('Erro ao confirmar presença:', error);
      alert('Houve um problema ao confirmar sua presença. Por favor, tente novamente ou entre em contato diretamente conosco.');
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
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
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-wedding-olive">Obrigado, {guestName}!</h2>
              <p className="text-stone-600 italic font-serif">Sua presença foi confirmada com sucesso.</p>
            </div>
            <p className="text-stone-400 text-sm animate-pulse">Redirecionando para o local...</p>
          </motion.div>
        ) : (
          <RSVPScreen onConfirm={handleConfirm} />
        );
      case 'mapa':
        return <MapaManualScreen />;
      default:
        return <RSVPScreen onConfirm={handleConfirm} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-wedding-cream relative shadow-2xl overflow-x-hidden">
      <Header
        title="Samuel & Lília"
        onBack={activeTab === 'mapa' ? () => setActiveTab('rsvp') : undefined}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isConfirmed={isConfirmed}
      />
    </div>
  );
}
