# Sokarie Fashion E-Commerce Website

A complete React + Vite implementation of a modern fashion e-commerce website featuring full shopping cart functionality, user authentication, search capabilities, and responsive design.

## 🚀 Features

### Core E-commerce Functionality
- **Shopping Cart**: Add, remove, update quantities, view total
- **Product Catalog**: 6 featured products with categories (clothing, eyewear, accessories, shoes)
- **Search**: Real-time product search with filtering
- **User Authentication**: Login/Register system with user profiles
- **Newsletter**: Email subscription with success feedback

### User Interface
- **Responsive Design**: Mobile-first approach with clean, modern aesthetic
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Modal System**: Cart, search, and user account modals
- **Notifications**: Success/error notifications for user actions
- **Professional Navigation**: Sticky header with functional icons

### Design Highlights
- Pink and white color scheme (#f4a6cd primary)
- Large hero section with call-to-action
- Product grid with overlay interactions
- Professional typography (Inter font)
- Smooth animations and micro-interactions

## 🛠️ Technology Stack
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Context API** - Global state management
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Navigation with cart/search/user icons
│   ├── Hero.jsx         # Main banner with "Discover Now" CTA
│   ├── CategoryGrid.jsx # Product showcase grid
│   ├── AccessoriesSection.jsx # Featured accessories
│   ├── Newsletter.jsx   # Email subscription
│   ├── Footer.jsx       # Site footer with links
│   ├── SearchModal.jsx  # Product search functionality
│   ├── CartModal.jsx    # Shopping cart interface
│   ├── UserModal.jsx    # Login/register system
│   └── Notification.jsx # Toast notifications
├── context/
│   └── AppContext.jsx   # Global state management
├── images/              # Product and website images
└── styles/              # Component CSS files
```

## 🎯 Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Start development server:**
   ```powershell
   npm run dev
   ```

3. **Open browser at:** `http://localhost:5173`

4. **Build for production:**
   ```powershell
   npm run build
   ```

## 🛍️ How to Use

### Shopping Features
1. **Browse Products**: View featured items in the category grid
2. **Add to Cart**: Click "ADD TO CART" on any product
3. **View Cart**: Click cart icon in header to see items
4. **Manage Cart**: Update quantities or remove items
5. **Search**: Use search icon to find specific products

### User Features
1. **Register/Login**: Click user icon to create account or login
2. **Newsletter**: Subscribe for 29% discount offer
3. **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🖼️ Image Assets
- Place your product images in `src/images/` folder
- Current setup expects: `1 (1).png` through `1 (6).png`
- Images are automatically responsive and optimized

## 🎨 Customization

### Colors
```css
:root {
  --primary-color: #f4a6cd;    /* Main brand color */
  --secondary-color: #333;      /* Text and accents */
  --background: #fff;           /* Main background */
  --background-light: #f8f9fa;  /* Section backgrounds */
}
```

### Products
Edit `src/context/AppContext.jsx` to modify:
- Product information
- Prices and descriptions
- Categories and images

### Branding
- Update logo in `Header.jsx`
- Modify hero text in `Hero.jsx`
- Change footer information in `Footer.jsx`

## 🔧 Demo Features
- **Cart functionality** with quantity management
- **User authentication** (demo mode - no backend)
- **Search system** with real-time filtering
- **Newsletter signup** with success feedback
- **Notifications** for user actions
- **Responsive design** for all screen sizes

## 📱 Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly interface

---

**Sokarie Fashion** - Elegant fashion for the modern woman  
Copyright © 2025 Sokarie Fashion. All rights reserved.
