import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isSearchOpen: false,
  searchQuery: '',
  user: null,
  isUserMenuOpen: false,
  products: [
    {
      id: 1,
      name: 'Elegant Dress',
      price: 129.99,
      image: '/src/images/1 (2).png',
      category: 'clothing',
      description: 'Beautiful elegant dress perfect for any occasion'
    },
    {
      id: 2,
      name: 'Stylish Sunglasses',
      price: 89.99,
      image: '/src/images/1 (3).png',
      category: 'eyewear',
      description: 'Trendy sunglasses with UV protection'
    },
    {
      id: 3,
      name: 'Designer Handbag',
      price: 199.99,
      image: '/src/images/1 (4).png',
      category: 'accessories',
      description: 'Premium leather handbag with modern design'
    },
    {
      id: 4,
      name: 'High Heel Shoes',
      price: 149.99,
      image: '/src/images/1 (5).png',
      category: 'shoes',
      description: 'Comfortable high heel shoes for elegant look'
    },
    {
      id: 5,
      name: 'Luxury Purse',
      price: 249.99,
      image: '/src/images/1 (6).png',
      category: 'accessories',
      description: 'Luxurious purse with premium materials'
    },
    {
      id: 6,
      name: 'Fashion Jacket',
      price: 179.99,
      image: '/src/images/1 (1).png',
      category: 'clothing',
      description: 'Trendy fashion jacket for all seasons'
    }
  ]
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          cartItems: updatedItems,
          cartCount: state.cartCount + 1,
          cartTotal: state.cartTotal + action.payload.price
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          cartCount: state.cartCount + 1,
          cartTotal: state.cartTotal + action.payload.price
        }
      }
    
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cartItems.find(item => item.id === action.payload)
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload)
      return {
        ...state,
        cartItems: filteredItems,
        cartCount: state.cartCount - itemToRemove.quantity,
        cartTotal: state.cartTotal - (itemToRemove.price * itemToRemove.quantity)
      }
    
    case 'UPDATE_QUANTITY':
      const updatedCartItems = state.cartItems.map(item => {
        if (item.id === action.payload.id) {
          const quantityDiff = action.payload.quantity - item.quantity
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
      const item = state.cartItems.find(item => item.id === action.payload.id)
      const quantityDiff = action.payload.quantity - item.quantity
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: state.cartCount + quantityDiff,
        cartTotal: state.cartTotal + (item.price * quantityDiff)
      }
    
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen
      }
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      }
    
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload
      }
    
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isUserMenuOpen: false
      }
    
    case 'TOGGLE_USER_MENU':
      return {
        ...state,
        isUserMenuOpen: !state.isUserMenuOpen
      }
    
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const toggleSearch = () => {
    dispatch({ type: 'TOGGLE_SEARCH' })
  }

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }

  const loginUser = (userData) => {
    dispatch({ type: 'LOGIN_USER', payload: userData })
  }

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' })
  }

  const toggleUserMenu = () => {
    dispatch({ type: 'TOGGLE_USER_MENU' })
  }

  return (
    <AppContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSearch,
      setSearchQuery,
      loginUser,
      logoutUser,
      toggleUserMenu
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
