import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearChart } from "../redux/ItemsChart.js"

import ChartItemComponent from './ChartItemComponent.js'

import './styles/ChartItems.css';

export const ChartItems = () => {

    const dispatch = useDispatch();

    const itemsChart = useSelector( state => state.itemsChart );

    const [orderResult, setOrderResult] = useState(false);

    function clearChartItems() {
        dispatch(clearChart(0));
    };

    function checkTotalPrice() {
        return itemsChart.items.reduce(((accum, current) => accum + current.price*current.amount), 0);
    };

    function checkTotalAmount() {
        return itemsChart.items.reduce(((accum, current) => accum + current.amount), 0);
    };

    function showConfirmation() {
        setOrderResult(true);
    };

    function cancelConfirmation() {
        setOrderResult(false);
        dispatch(clearChart(0));
    };

    const chartItemsResult = useMemo(
        () => {
         function setChartItemCode() {
            const itemsCode = itemsChart.items.map(item =>
                <ChartItemComponent key={item.id} info={item}></ChartItemComponent>);
                return itemsCode;
        }

        return (
            <div className="ChartItems">
                <div className="chart-header">
                    <h2>Корзина</h2>
                    <div onClick={clearChartItems} className="chart-clear">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <span>Очистить корзину</span>
                    </div>
                </div>
                {setChartItemCode()}
                <div className="chart-footer">
                    <div className="total">Итого товаров: <strong>{checkTotalAmount()} шт.</strong></div>
                    <div className="total">Итоговая стоимость: <strong>{checkTotalPrice()} руб.</strong></div>
                </div>
                <div className="order" onClick={showConfirmation}>Оформить заказ</div>

                {
                orderResult &&
                    <div className="overlay">
                        <div className="order-confirmation">
                            <svg width="35" height="35" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={cancelConfirmation}><path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="black"></path><path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="black"></path></svg>
                            <p>Спасибо за заказ!<br/>Он будет доставлен в ближайшее время!</p>
                        </div>
                    </div>
                }
            </div>
        );
        // eslint-disable-next-line 
    }, [itemsChart.items, orderResult]
    );
    
    return chartItemsResult;
};
