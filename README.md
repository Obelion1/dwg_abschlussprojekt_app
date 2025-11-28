# fpadw_app

A React-based frontend application for a webshop, featuring user authentication, product browsing, and shopping cart management.

git repository @ https://github.com/Obelion1/dwg_abschlussprojekt_app

## Features

- User registration and login with session-based authentication
- Protected product catalog (only accessible when logged in)
- Interactive product cards with click-to-view details modal
- Shopping cart with quantity management
- Responsive design with Bootstrap integration
- Client-side routing with React Router

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Running backend API (fpadw_api)

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd fpadw_app
```

2. Install dependencies:
```bash
npm install
```

3. Ensure the backend API is running on `http://localhost:3001`

## Running the Application

Development mode:
```bash
npm run dev
```

The application will run on `http://localhost:5173` by default.

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Dependencies

### Core
- **react** (v19.2.0) - UI library
- **react-dom** (v19.2.0) - React DOM rendering
- **vite** (v7.2.2) - Build tool and development server

### Routing & UI
- **react-router-dom** (v7.9.5) - Client-side routing
- **bootstrap** (v5.3.8) - CSS framework
- **react-bootstrap** (v2.10.10) - Bootstrap components for React

### Development
- **@vitejs/plugin-react** - Vite React plugin
- **eslint** - Code linting
- **nodemon** - Development auto-restart

## Application Structure

### Pages

#### Home
Landing page with navigation to other sections.

#### Register
User registration form.
- Email and password input
- Password hashing handled by backend
- Redirects to login on success

#### Login
User authentication form.
- Creates session on successful login
- Session cookie stored for subsequent requests
- Redirects to products page on success

#### Products
Protected product catalog (requires active session).
- Displays grid of product cards
- Click product image or card to view detailed modal
- Add to cart directly from card or modal
- Shows success message on add to cart
- Automatically checks authentication status

#### Cart
Shopping cart management.
- View all cart items
- Increase/decrease quantity with +/- buttons
- Remove items from cart
- Real-time total price calculation
- All changes synchronized with backend session

## Key Features

### Authentication Flow
1. User registers or logs in
2. Backend creates session with cookie
3. Frontend includes credentials in all requests
4. Products page checks auth status on load
5. Unauthenticated users see login prompt

### Product Detail Modal
- Click any product card to open modal overlay
- View full product description
- Add to cart from modal
- Click outside modal or X button to close

### Session Management
- All API requests include `credentials: 'include'` for cookie handling
- CORS configured between frontend (5173) and backend (3001)
- Session persists across page refreshes
- Logout destroys session on backend

## API Integration

The frontend communicates with the backend API at `http://localhost:3001`:

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `POST /api/logout` - Session destruction
- `GET /api/auth/check` - Verify authentication status
- `GET /api/products` - Fetch product catalog
- `GET /api/cart` - Get shopping cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item

All requests include credentials for session cookie handling.

## Styling

- Plain CSS with component-specific stylesheets
- Bootstrap for responsive layout and components
- Custom CSS for product cards, modals, and cart interface
- Mobile-responsive grid layout for products

## Development Notes

### CORS Configuration
The frontend expects the backend to accept requests from `http://localhost:5173` with credentials enabled.

### State Management
- React hooks (useState, useEffect) for local state
- No external state management library
- Cart state synchronized with backend session

### Routing
Protected routes redirect to login if user is not authenticated.

## Browser Compatibility

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Security Considerations

- Passwords never stored in frontend
- Session cookies handled by browser
- Protected routes check authentication
- CORS properly configured
- No sensitive data in localStorage

## Future Enhancements

Potential improvements for production:
- Environment variables for API URL
- Loading states and skeletons
- Error boundary components
- Toast notifications for better UX
- Persistent cart with localStorage fallback
- Image lazy loading
- Search and filter functionality

## License

This project is for educational purposes.