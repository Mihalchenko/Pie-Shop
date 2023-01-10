import { configureStore } from '@reduxjs/toolkit';

import sortSlice from './SortSlice.js';

import chartSlice from './ItemsChart';

export const store = configureStore({
    reducer: {
        itemsSort: sortSlice,
        itemsChart: chartSlice,
    },
})
