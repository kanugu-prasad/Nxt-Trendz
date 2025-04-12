import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const removeItemFromCart = cartList.filter(each => each.id !== id)
    this.setState({cartList: removeItemFromCart})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const incrementQuantity = cartList.map(eachCart => {
      if (eachCart.id === id) {
        return {...eachCart, quantity: eachCart.quantity + 1}
      }
      return eachCart
    })
    this.setState({cartList: incrementQuantity})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decrementQuantity = cartList.map(eachCart => {
      if (eachCart.id === id) {
        return {...eachCart, quantity: eachCart.quantity - 1}
      }
      return eachCart
    })

    const removeZeroQuantity = decrementQuantity.filter(
      each => each.quantity !== 0,
    )
    this.setState({cartList: removeZeroQuantity})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const findCartItem = cartList.find(each => each.id === product.id)
    if (findCartItem) {
      const updateCartItem = cartList.map(each => {
        if (each.id === product.id) {
          return {...each, quantity: each.quantity + product.quantity}
        }
        return each
      })
      this.setState({cartList: updateCartItem})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
