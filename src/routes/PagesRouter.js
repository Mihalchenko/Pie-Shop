import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MyShop } from '../components/MyShop.js';

import { ShopChart } from '../components/ShopChart';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/*" element={<MyShop/>} />
        <Route path="/chart" element={<ShopChart/>} />
      </Routes>
    );
    
};