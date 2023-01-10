import { createSlice } from '@reduxjs/toolkit';

function checkUserStorage() {
  if (localStorage.getItem('mihalchenkoWebSiteUserInfo') == null) {
    return [];
  } else {
    let chartInfo = JSON.parse(window.localStorage.getItem("mihalchenkoWebSiteUserInfo"));

    return chartInfo;
  }
};

const initialState={
  items: checkUserStorage(),
};

function updateUserStorage(info) {
  window.localStorage.setItem("mihalchenkoWebSiteUserInfo", JSON.stringify(info));
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {

    addToChart: (state,action) => { // добавляет товар в корзину
      state.items.push(action.payload);

      updateUserStorage(state.items);
    },

    increaseAmount: (state,action) => { // количество товара +1
      state.items.find(item => item.id === action.payload).amount +=1;

      updateUserStorage(state.items);
    },

    decreaseAmount: (state,action) => { // количество товара -1
      state.items.find(item => item.id === action.payload).amount -=1;
      
      updateUserStorage(state.items);
    },

    clearChart: (state,action) => { // очистка корзины
      state.items.length = action.payload;

      updateUserStorage(state.items);
    },

    deleteFromChart: (state,action) => { // удалить товар элемент из корзины
      state.items = state.items.filter((item) => item.id !== action.payload);

      updateUserStorage(state.items);
    },

  },
});

export const { addToChart, increaseAmount, clearChart, decreaseAmount, deleteFromChart } = chartSlice.actions;

export default chartSlice.reducer;
