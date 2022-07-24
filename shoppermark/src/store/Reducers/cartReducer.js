import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, { type, payload }) => {

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload

      const itemExists = state.cartItems.find(x => x.product === item.product)

      if (itemExists) {
        return { ...state, cartItems: state.cartItems.map(x => x.product === itemExists.product ? item : x) }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }

    case CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter(x => x.product !== payload) }

    case CART_SAVE_SHIIPPING_ADDRESS:
      return { ...state, shippingAddress: payload }

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload }

    default: return state
  }
}