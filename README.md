# Roofty - Real Estate Website

A modern, responsive real estate website built with Vite, React, TypeScript, and Tailwind CSS. Features property listings, search functionality, and elegant animations.

## Features

- 🏠 **Property Listings** - Browse houses, apartments, condos, villas, townhouses, lofts, and duplexes
- 🔍 **Advanced Search** - Filter by location, property type, price range, bedrooms, and bathrooms
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ✨ **Smooth Animations** - Beautiful transitions and hover effects using Framer Motion
- 🎨 **Modern UI** - Clean design with Royal Blue and Warm Gold color scheme
- 📊 **Property Details** - Detailed property pages with image galleries and amenities
- 💬 **Contact Forms** - Integrated contact and property inquiry forms
- 🏢 **About Section** - Company information, team profiles, and testimonials

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Backend**: Express.js, TypeScript
- **Data Storage**: In-memory storage (no database required)
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd roofty-real-estate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start the development server (runs both frontend and backend)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
roofty-real-estate/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and types
│   │   └── hooks/          # Custom React hooks
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory data storage
│   └── vite.ts            # Vite development setup
├── shared/                # Shared types and schemas
│   └── schema.ts          # Data models and validation
└── package.json
```

## Key Pages

- **Home** (`/`) - Hero section, featured properties, testimonials
- **Properties** (`/properties`) - Property listings with search and filters
- **Property Detail** (`/properties/:id`) - Individual property details
- **About** (`/about`) - Company information and team
- **Contact** (`/contact`) - Contact form and information

## API Endpoints

- `GET /api/properties` - Get all properties
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/search` - Search properties with filters
- `GET /api/properties/:id` - Get specific property
- `GET /api/testimonials` - Get customer testimonials
- `POST /api/contact` - Submit contact form

## Data Storage

This project uses in-memory storage for simplicity and demonstration purposes. All property data, testimonials, and user information are stored in memory and reset when the server restarts. No external database is required.

Sample data includes:
- 19 diverse properties across multiple states
- Customer testimonials
- Property images from Unsplash
- Agent contact information

## Customization

### Adding New Properties

Edit `server/storage.ts` and add new property objects to the `sampleProperties` array.

### Styling

The project uses Tailwind CSS with custom color variables defined in `client/src/index.css`. Main colors:
- Royal Blue: `#1E3A8A`
- Warm Gold: `#FBBF24`
- Sage Green: `#10B981`
- Coral: `#F87171`

### Components

The project uses shadcn/ui components for consistency. Component configurations are in `components.json`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes. Please check individual dependencies for their respective licenses.

## Support

For questions or issues, please contact the development team or create an issue in the repository.# Roofty - Real Estate Website

A modern, responsive real estate website built with Vite, React, TypeScript, and Tailwind CSS. Features property listings, search functionality, and elegant animations.
