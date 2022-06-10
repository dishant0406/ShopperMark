import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload

      const itemExists = state.cartItems.find(x => x.product === item.product)

      if (itemExists) {
        return { ...state, cartItems: state.cartItems.map(x => x.product === itemExists.product ? item : x) }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }

    default: return state
  }
}