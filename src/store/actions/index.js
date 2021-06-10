export const add_item = (itemData) => {
  return { type: 'ADD_ITEM', payload: itemData };
};

export const remove_item_entirely = (id) => {
  return { type: 'REMOVE_ITEM_ENTIRELY', payload: id };
};

export const increase_amount = (id) => {
  return { type: 'INCREASE_AMOUNT', payload: id };
};

export const decrease_amount = (id) => {
  return { type: 'DECREASE_AMOUNT', payload: id };
};
