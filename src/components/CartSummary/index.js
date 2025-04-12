// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let sum = 0
      cartList.forEach(each => {
        sum += each.price * each.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="summary-heading">
            Order Total: <span className="span-style">Rs {sum}</span>
          </h1>
          <p className="summary-paragraph">{cartList.length} Items in cart</p>

          <button className="summary-button1">CheckOut</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
