import React from 'react';

import {ShopHeader} from './ShopHeader.js'
import {ShopCategory} from './ShopCategory.js'
import {ShopItems} from './ShopItems.js'

import './styles/MyShop.css';

export const MyShop = () => {

    const myShopResult = () => {
        return (
            <div className="MyShop">
                <ShopHeader />
                <ShopCategory />
                <ShopItems />
            </div>
        );
    };
    
    return myShopResult();
};
