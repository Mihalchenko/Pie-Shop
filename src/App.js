import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store'

import { BrowserRouter } from 'react-router-dom';

import { PagesRouter } from './routes/PagesRouter';

export const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <PagesRouter />
        </Provider>
    </BrowserRouter>
);
