import { createSlice } from '@reduxjs/toolkit';

const initialState={
  sortMode: null, // показывает, какая сортировка выбрана
  sortSelection: false, // для отображения списка для сортировки
  items: null,
  currentItems: null,
  lettersFilter: "",
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {

    setSortMode: (state,action) => { // показывает, какая сортировка выбрана
      state.sortMode = action.payload;
    },

    startSortSelection: (state,action) => { // для отображения списка для сортировки
      state.sortSelection = action.payload;
    },

    setItems: (state,action) => { // определение списка товаров по запросу с сервера
      state.items = action.payload;
    },

    setCurrentItems: (state,action) => {
      state.currentItems = action.payload; // текущий список товаров
    },

    setLettersFilter: (state,action) => {
      state.lettersFilter = action.payload; // буквы для фильтрации
    },

  },
});

export const { setSortMode, startSortSelection, setItems, setCurrentItems, setLettersFilter } = sortSlice.actions;

export default sortSlice.reducer;
