# Literatura Română în Dimensiune Virtuală

A modern web platform for the national interdisciplinary competition "Romanian Literature in Virtual Dimension" organized by the Grigore Moisil Theoretical High School of Computer Science in Iași.

## Overview

This React-based website serves as the official platform for the competition, providing information about the event, registration process, and results. The competition aims to blend literature and technology, offering students from grades V-XII an opportunity to showcase their creative potential through digital projects.

Originally started in 2007 as a local competition, "Romanian Literature in Virtual Dimension" has evolved into a prestigious national contest that invites students to explore Romanian literature and culture through innovative digital approaches.

## Features

- **Responsive Design**: Fully optimized for all devices and screen sizes
- **Modern UI**: Clean, literary-themed interface with elegant typography
- **Content Sections**: Dedicated pages for various competition categories:
  - Reconstituiri (Reconstructions)
  - Impact Cultural (Cultural Impact)
  - Destin Literar (Literary Destiny)
  - Pecețile Tradiției (Seals of Tradition)
  - Literatura la Zi (Contemporary Literature)
- **Navigation**: Intuitive menu system with smooth scrolling
- **Registration**: Direct link to competition registration form

## Tech Stack

- React 18
- TypeScript
- React Router
- CSS
- Vite

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── Home/        # Homepage specific components
│   ├── Layout/      # Layout related components
│   └── UI/          # Generic UI components
├── pages/           # Page components for routing
├── styles/          # CSS files
│   ├── components/  # Component-specific styles
│   └── global.css   # Global styles and variables
└── main.tsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zaramihnea/lrdv.git
cd lrdv
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.