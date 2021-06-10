import { createStore } from 'redux';
import cartItemsReducer from './reducers/cartItems';

export default createStore(cartItemsReducer);
