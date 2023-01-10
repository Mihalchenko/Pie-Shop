import React, { useMemo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from "react-router-dom";

import { setCurrentItems } from "../redux/SortSlice.js"

import {clientsLoad} from '../redux/ClientsLoad.js'

import ItemComponent from './ItemComponent.js'

import './styles/ShopItems.css';

import Loader from './Loading.js'

export const ShopItems = () => {

    const dispatch = useDispatch();

    const itemsArr = useSelector( state => state.itemsSort );

    const location = useLocation();

    useEffect(
        () => {
            if (!itemsArr.items) {
                dispatch(clientsLoad);
            };
            // eslint-disable-next-line 
        }, []
    );

    useEffect(
        () => {
            checkCurrentItems();
            // eslint-disable-next-line 
        }, [itemsArr.items, location.pathname, itemsArr.lettersFilter, location.search]
    );

    function checkCurrentItems () {
        if (itemsArr.items) {
            let newArray;
            if (location.pathname === "/") {
                newArray = [...itemsArr.items];
            } else {
                newArray = itemsArr.items.filter(item => item.type1 === location.pathname.slice(1) || item.type2 === location.pathname.slice(1));
            };

            if (itemsArr.lettersFilter) {
                newArray = newArray.filter(item => (item.name.toLowerCase()).includes((itemsArr.lettersFilter).toLowerCase()));
            };
            
            if (location.search === "?sort=increase") {
                newArray = newArray.sort((a,b) => a.price > b.price ? 1 : -1);
            } else if (location.search === "?sort=decrease") {
                newArray = newArray.sort((a,b) => a.price > b.price ? -1 : 1);
            }

            dispatch(setCurrentItems(newArray));
        };
    };

    const shopItemsResult = useMemo(
        () => {
        function setItemCode() {
            if (itemsArr.currentItems) {
                const itemsCode = itemsArr.currentItems.map(item =>
                    <ItemComponent key={item.id} info={item}></ItemComponent>);
                    return itemsCode;
            }
        }

        return (
            <div className="ShopItems">
                {itemsArr.currentItems ? setItemCode() : <Loader/>}
            </div>
        );
    }, [itemsArr.currentItems]
    );
    
    return shopItemsResult;
};
