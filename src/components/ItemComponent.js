import React, { useMemo, useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addToChart, increaseAmount } from "../redux/ItemsChart.js"

import './styles/ItemComponent.css';
// eslint-disable-next-line 
export default ({info}) => {

    const dispatch = useDispatch();

    const itemsChart = useSelector( state => state.itemsChart );

    const [countItems, addItem] = useState(0);

    const firstRender = useRef(true);

    function chartUpdate() {
        addItem(countItems + 1);
    };

    const itemInChart = itemsChart.items.find(item => item.id === info.id);

    function checkCurrentAmount() {
        if (itemInChart) {
            return itemInChart.amount;
        } else {
            return;
        }
    };

    useEffect(
        () => {
            if (firstRender.current) {
                firstRender.current = false;
            } else {
                if (itemInChart) {
                    dispatch(increaseAmount(itemInChart.id));
                } else {
                    let newItem = {"id": info.id, "name": info.name, "price": info.price, "image": info.image, "description": info.description, "amount": countItems};

                    dispatch(addToChart(newItem));
                };
            }
            // eslint-disable-next-line 
        }, [countItems]
    )

    const itemResult = useMemo(
        () => {
        return (
            <div className="item">
                <img src={info.image} alt={info.name} className="item-image"></img>
                <p className="item-name">{info.name}</p>
                <p>Вес: {info.weight} г.</p>
                <p className="item-type">Вид: {info.type1}, {info.type2}</p>
                <div>
                    <div className="item-price">Цена: {info.price} руб.</div>
                    <button className="item-to-chart" onClick={chartUpdate}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#fe5f1e"></path></svg>
                        <span>В корзину</span>
                        {
                            itemInChart && <span className="item-to-chart-amount">{checkCurrentAmount()}</span>
                        }
                    </button>
                </div>
            </div>
        );
        // eslint-disable-next-line 
    }, [itemInChart]
    );
    
    return itemResult;
};
