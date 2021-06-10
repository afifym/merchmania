const initialState = { cartItems: [] };

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case 'REMOVE_ITEM_ENTIRELY':
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload),
        ],
      };

    case 'INCREASE_AMOUNT':
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) => {
            if (item.id === action.payload) {
              item.amount++;
              return item;
            }
            return item;
          }),
        ],
      };
    case 'DECREASE_AMOUNT':
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) => {
            if (item.id === action.payload) {
              item.amount--;
              return item;
            }
            return item;
          }),
        ],
      };
    default:
      return state;
  }
};

export default cartItemsReducer;
