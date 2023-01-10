import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { NavLink } from "react-router-dom";

import {ShopHeader} from './ShopHeader.js'

import {ChartItems} from './СhartItems.js'

import './styles/ShopChart.css';

import emptyChart from './images/empty-cart.svg'

export const ShopChart = () => {

    const itemsChart = useSelector( state => state.itemsChart );

        const myShopChartResult = useMemo(
            () => {
                return (
                    <div className="ShopChart">
                        <ShopHeader />
                        {
                            itemsChart.items.length === 0 &&
                            <div className="chart-empty">
                                <h1>Корзина пуста</h1>
                                <p>Для того, чтобы оформить заказ, добавьте товары в корзину.</p>
                                <img src={emptyChart} alt="empty chart"></img>
                                <NavLink to={"/"} className="go-to-main">На главную</NavLink>
                            </div>
                        }
                        {
                            itemsChart.items.length !== 0 && <ChartItems></ChartItems>
                        }
                    </div>
                );
            }, [itemsChart.items]
        )
        return myShopChartResult;
    };
