# Casamento Samuel & Lília 💍

Este é o site oficial para confirmação de presença (RSVP) e informações do casamento de Samuel e Lília.

## 🚀 Como Executar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` baseado no `.env.example` e adicione suas chaves do Supabase:
   ```env
   VITE_SUPABASE_URL=sua_url
   VITE_SUPABASE_ANON_KEY=sua_chave
   ```

3. **Rodar em desenvolvimento**:
   ```bash
   npm run dev
   ```

## ☁️ Deploy na Vercel

Este projeto já está configurado para a Vercel com:
- `vercel.json`: Para lidar com roteamento Single Page Application (SPA).
- Limpeza de dependências para build estável.

### Passos para o Deploy:
1. Conecte o repositório na Vercel.
2. Adicione as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel da Vercel.
3. O deploy será feito automaticamente em cada `push`.

## 🛠️ Tecnologias
- React + Vite
- Tailwind CSS
- Supabase (Backend/Banco de dados)
- Framer Motion (Animações)
- Lucide React (Ícones)

