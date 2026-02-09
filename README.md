# Shopping Cart Application

A full-stack e-commerce shopping cart application built with React, TypeScript, and MongoDB. This application allows users to browse products, manage inventory, add items to cart, and complete purchases.

## 🚀 Features

- **Product Management**
  - View all available products
  - Add new products to inventory
  - Edit existing products (title, price, quantity)
  - Delete products from inventory
  - Sort products by title, price, or quantity

- **Shopping Cart**
  - Add items to cart
  - View cart with item details and total price
  - Checkout functionality
  - Real-time inventory updates

- **UI/UX**
  - Dark/Light theme toggle
  - Currency conversion toggle
  - Responsive design
  - Form validation with Zod

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Zod** - Schema validation
- **Vitest** - Unit testing
- **React Testing Library** - Component testing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas Account](https://account.mongodb.com/account/register) or local MongoDB installation
- npm or yarn package manager

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shopping_cart
```

### 2. Database Setup

1. Create a [MongoDB Atlas](https://account.mongodb.com/account/register) account (free tier available)
2. Create a new cluster (AWS free tier recommended)
3. Create a database named `shopping_cart` with two collections:
   - `products`
   - `cartitems`
4. **Set up Database Access:**
   - Go to Security → Database Access
   - Click "Add New Database User"
   - Create username and password
   - Click "Add User"
5. **Configure Network Access:**
   - Go to Security → Network Access
   - Click "Add IP Address"
   - Whitelist your IP address (or use 0.0.0.0/0 for development)
6. **Get Connection String:**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<username>`, `<password>`, and add your database name

### 3. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
DB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopping_cart?retryWrites=true&w=majority
PORT=5001
```

### 4. Client Setup

```bash
cd client
npm install
```

## 🚀 Running the Application

### Start the Server

```bash
cd server
npm start
# Or for development with auto-reload:
npm run start-watch
```

The server will run on `http://localhost:5001`

### Start the Client

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` (default Vite port)

### View Static UI (Optional)

During development, you can view static HTML pages at:
```
http://localhost:5001/ui
```

## 🧪 Testing

Run tests for the React application:

```bash
cd client
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
```

## 📁 Project Structure

```
shopping_cart/
├── client/                  # React frontend application
│   ├── src/
│   │   ├── components/     # React components (Cart, Product, Forms, etc.)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # API service functions (products, cart, exchange rates)
│   │   ├── reducers/       # State management reducers
│   │   ├── providers/      # Context providers (Theme, Currency)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── helpers/        # Utility functions
│   │   ├── lib/            # Third-party library configurations
│   │   ├── assets/         # Static assets
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   ├── vite.config.ts      # Vite configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── server/                  # Node.js backend
│   ├── models/             # Mongoose models (Product, CartItem)
│   ├── routes/             # Express routes (API, UI)
│   ├── public/             # Static files
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── .env                # Environment variables (not in git)
│
├── docs/
│   └── api.md              # API documentation
│
└── README.md
```

## 📚 API Documentation

Complete API documentation is available in [`docs/api.md`](docs/api.md)

### Quick API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/cart` | Get cart items |
| POST | `/api/add-to-cart` | Add item to cart |
| POST | `/api/checkout` | Checkout and clear cart |

## 🎨 Component Overview

### Main Components

- **App**: Root component managing global state and data fetching
- **ProductListing**: Displays all products with sorting functionality
- **Product/EditableProduct**: Individual product display with edit capabilities
- **Cart**: Shopping cart display with checkout button
- **ProductForm**: Reusable form for adding/editing products
- **ThemeToggle**: Dark/light mode switcher
- **CurrencyToggle**: Currency conversion toggle

### State Management

The application uses React's `useReducer` hook for state management:
- **productsReducer**: Manages product list and sorting
- **cartReducer**: Manages shopping cart items

## 🔧 Development

### Available Scripts

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint

**Server:**
- `npm start` - Start server
- `npm run start-watch` - Start server with nodemon (auto-reload)

## 🌟 Sample Data

To get started, you can use this sample product data:

```js
[
  {
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
  {
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
]
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- The `.env` file is already in `.gitignore`
- Use environment variables for sensitive data
- In production, use proper authentication and authorization
- Restrict CORS origins in production

## 📝 License

This project is part of a capstone project.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, and MongoDB
