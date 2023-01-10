import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { increaseAmount, decreaseAmount, deleteFromChart } from "../redux/ItemsChart.js"

import './styles/ChartItemComponent.css';
// eslint-disable-next-line
export default ({info}) => {

    const dispatch = useDispatch();

    const itemsChart = useSelector( state => state.itemsChart );

    const itemInChart = itemsChart.items.find(item => item.id === info.id);

    const [itemRemove, startRemove] = useState(false);

    function increaseItemAmount() {
        dispatch(increaseAmount(itemInChart.id));
    };

    function decreaseItemAmount() {
        dispatch(decreaseAmount(itemInChart.id));
    };

    function deleteItemFromChart() {
        startRemove(true);
        setTimeout(() => dispatch(deleteFromChart(itemInChart.id)), 1000);
    };

    const chartItemResult = useMemo(
        () => {
        return (
            <div className={itemRemove ? "ChartItem ChartItem-remove" : "ChartItem"}>
                <div className="chart-item-info">
                    <img src={info.image} alt={info.name}></img>
                    <h3 className="chart-item-name">{info.name}</h3>
                    <div className="chart-item-amount">
                        <span className={info.amount > 1 ? "chart-item-amount-change" : "chart-item-amount-change-disabled"} onClick={info.amount > 1 ? decreaseItemAmount : null}>-</span>
                        <h3>{info.amount}</h3>
                        <span className="chart-item-amount-change" onClick={increaseItemAmount}>+</span>
                    </div>
                    <h3 className="chart-item-price">{info.price * info.amount} руб.</h3>
                    <div className="delete-chart-item">
                    <svg width="45" height="45" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={deleteItemFromChart}><path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#8d8d8d"></path><path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#8d8d8d"></path></svg>
                    </div>
                </div>
                <p className="chart-item-description">{info.description}</p>
            </div>
        );
        // eslint-disable-next-line
    }, [itemInChart, itemRemove]
    );
    
    return chartItemResult;
};
