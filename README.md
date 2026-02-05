# 📋 Kanban Board

Um quadro Kanban moderno e visualmente atraente, desenvolvido com React + TypeScript como projeto de portfólio.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)

## ✨ Features

- 🎨 **Design Premium** - Tema dark moderno com gradientes e glassmorphism
- 🖱️ **Drag & Drop Customizado** - Arraste cards entre colunas com feedback visual
- 🔍 **Busca em Tempo Real** - Filtre tarefas por título, descrição ou tags
- ➕ **CRUD Completo** - Criar, editar e excluir tarefas
- 🏷️ **Sistema de Tags** - Organize tarefas com tags coloridas
- 📱 **Responsivo** - Funciona em desktop e mobile
- ⚡ **Performance** - Animações suaves e código otimizado

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/muriloterra/Kanban.git

# Entre na pasta
cd Kanban

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **CSS Modules** - Estilização

## 📁 Estrutura

```
src/
├── components/
│   ├── Header.tsx        # Logo, busca e botão nova tarefa
│   ├── KanbanBoard.tsx   # Board principal com drag & drop
│   ├── KanbanColumn.tsx  # Colunas: To Do, Doing, Done
│   ├── KanbanCard.tsx    # Cards de tarefas
│   └── TaskModal.tsx     # Modal criar/editar
├── types.ts              # Definições TypeScript
├── index.css             # Design system
└── App.tsx               # Componente principal
```

## 📝 Scripts

| Comando           | Descrição                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Inicia servidor de desenvolvimento |
| `npm run build`   | Gera build de produção             |
| `npm run preview` | Preview do build local             |


