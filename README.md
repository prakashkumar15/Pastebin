# Pastebin - Paste Sharing Application

A modern paste-sharing web application built with **Next.js 16**, **React 19**, and **TypeScript**. Users can create temporary pastes with customizable TTL (time-to-live) and view limits, then share them via unique URLs.

## Quick Start

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or cloud instance)
- **Docker** (optional, for MongoDB containerization)

### Local Development

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your MongoDB connection:

   ```env
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB=pastebin
   SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Start MongoDB** (if using Docker):

   ```bash
   docker compose -f dev/docker.compose.yml up -d mongodb
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

---

## Persistence Layer

### MongoDB

This application uses **MongoDB** as its primary data store for the following reasons:

- **Flexible Schema**: Pastes store varying metadata (TTL, view limits, content)
- **Native TTL Support**: MongoDB's TTL indexes automatically delete expired documents
- **Scalability**: Built for horizontal scaling and cloud deployments
- **JSON-like Documents**: Natural fit for JavaScript/Node.js applications

### Database Schema

**Collection: `notes`**

```typescript
{
  _id: ObjectId; // Auto-generated unique ID
  note: string; // Paste content
  max_views: number | null; // Max views allowed
  views: number; // Current view count
  expires_at: Date | null; // Expiration timestamp
}
```

---

## Architecture & Design Decisions

### 1. **Component-Based UI Architecture**

- **Modular Components**: UI split into reusable components (`TextInput`, `Alert`, `PasteDialog`, `Navbar`)
- **Separation of Concerns**: Components focus on presentation, hooks manage state/logic

### 2. **Custom Hooks for State Management**

- **`useHome()`**: Manages home page state (paste creation, alerts, clipboard)
- **`usePaste(id)`**: Manages paste viewing state (fetching, errors, loading)
- **Benefits**: No external state management library, cleaner component code, reusability

### 3. **API Query Separation**

- **`src/app/query/home.ts`**: `createPaste()` - handles POST requests
- **`src/app/query/paste.ts`**: `getPaste(id)` - handles GET requests
- **Benefits**: Centralized API logic, easy to mock for testing, clear data flow

### 4. **Expiration & View Limits**

- **TTL-Based Expiration**: Pastes can expire after N seconds
- **View Count Limits**: Pastes can be set to expire after N views
- **Server-Side Validation**: API checks expiration before returning content
- **Benefits**: Privacy-focused, prevents abuse, automatic cleanup

### 5. **Next.js App Router**

- **File-Based Routing**: Intuitive structure with `app/` directory
- **Server Components**: Navbar uses server-side rendering where possible
- **Client Components**: Interactive pages marked with `"use client"`
- **API Routes**: RESTful endpoints in `app/api/`

### 6. **Database Connection Pooling** (Development)

- **Global Client Instance**: MongoDB client reused across requests in development
- **Prevents Connection Exhaustion**: Singleton pattern prevents multiple connections
- **Benefits**: Optimal performance and resource usage

### 7. **Responsive UI with Tailwind CSS**

- **Utility-First CSS**: No CSS file management, inline styling
- **Mobile-First**: Responsive design built-in

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page (create paste)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── api/
│   │   ├── healthz/
│   │   │   └── route.ts      # GET: Health check
│   │   └── pastes/
│   │       ├── route.ts      # POST: Create paste
│   │       └── [id]/
│   │           └── route.ts  # GET: Fetch paste by ID
│   └── p/
│       └── [id]/
│           └── page.tsx      # View paste page
├── components/
│   ├── home/
│   │   ├── text.tsx          # Textarea + Save button
│   │   ├── alert.tsx         # Alert notifications
│   │   └── dialog.tsx        # Success dialog
│   └── shared/
│       └── navbar.tsx        # Navigation bar
├── hooks/
│   ├── home.ts               # State for paste creation
│   └── paste.ts              # State for paste viewing
├── query/
│   ├── home.ts               # API functions for creating pastes
│   └── paste.ts              # API functions for fetching pastes
└── utils/
    ├── mongo.ts              # MongoDB connection
    ├── constants.ts          # App constants
    └── time.ts               # Time utilities
```

---

## Key Features

✅ **Create Pastes**: Post text with configurable TTL and view limits  
✅ **Share via URL**: Unique links for each paste  
✅ **Auto-Expiration**: TTL-based or view-count-based expiry  
✅ **Copy to Clipboard**: One-click URL copying  
✅ **Error Handling**: User-friendly error messages  
✅ **Responsive Design**: Works on mobile and desktop  
✅ **Type-Safe**: Full TypeScript support

---

## Technologies Used

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| **Next.js 16**     | Full-stack React framework |
| **React 19**       | UI library                 |
| **TypeScript**     | Type safety                |
| **Tailwind CSS 4** | Styling                    |
| **MongoDB 7.0**    | Database                   |
| **ESLint**         | Code linting               |

---

## API Endpoints

### GET `/api/healthz` - Health Check

**Response (Success):**

```json
{
  "ok": true
}
```

**Status Codes:**

- `200` - Service and MongoDB are healthy

**Purpose**: Useful for monitoring, load balancers, and Kubernetes probes to verify the application and database connectivity.

---

### POST `/api/pastes` - Create Paste

**Request:**

```json
{
  "content": "Your paste content",
  "ttl_seconds": 3600,
  "max_views": 5
}
```

**Response:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "http://localhost:3000/p/507f1f77bcf86cd799439011"
}
```

### GET `/api/pastes/[id]` - Fetch Paste

**Response:**

```json
{
  "content": "Your paste content",
  "remaining_views": 4,
  "expires_at": "2025-12-30T05:07:01.015Z"
}
```

---

## Environment Variables

```env
MONGODB_URI          # MongoDB connection string (required)
MONGODB_DB           # Database name (default: pastebin)
SITE_URL             # Server-side site URL
NEXT_PUBLIC_SITE_URL # Client-side site URL
NODE_ENV             # development or production
TEST_MODE            # 0 or 1 for testing
```

---

## Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
```

---
