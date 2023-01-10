import React, {useMemo, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, NavLink, useLocation } from "react-router-dom";

import './styles/ShopCategory.css';

import { setSortMode, startSortSelection } from "../redux/SortSlice.js"

export const ShopCategory = () => {

    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(
        () => {
            if (location.search === "?sort=decrease") {
                dispatch(setSortMode("цене (по убыванию)"));
            } else if (location.search === "?sort=increase") {
                dispatch(setSortMode("цене (по возрастанию)"));
            } else {
                dispatch(setSortMode(null));
            }
            // eslint-disable-next-line 
        }, [location.pathname]
    );

    const navigate = useNavigate();

    const sort = useSelector( state => state.itemsSort);

    function showSortLabel (event) {
        dispatch(startSortSelection(!sort.sortSelection));
    };

    function sortStart (event) {
        if (event.target.innerHTML === "умолчанию") {
            navigate("?");
            dispatch(setSortMode(null));
        } else if (event.target.innerHTML === "цене (по убыванию)") {
            navigate("?sort=decrease");
            dispatch(setSortMode(event.target.innerHTML));
        } else if (event.target.innerHTML === "цене (по возрастанию)") {
            navigate("?sort=increase");
            dispatch(setSortMode(event.target.innerHTML));
        }
        dispatch(startSortSelection(false));
    };

    function getLinkClass (obj) {
        if (obj.isActive) {
            return "active"
        }
    };

    const myShopCategory = useMemo(
        () => {
        return (
            <div className="ShopCategory">
                <div className="category">
                    <nav>
                        <NavLink to={"/" + location.search} className={getLinkClass}>Вcе</NavLink>
                        <NavLink to={"/sweet" + location.search} className={getLinkClass}>Сладкие</NavLink>
                        <NavLink to={"/hearty" + location.search} className={getLinkClass}>Сытные</NavLink>
                        <NavLink to={"/meat" + location.search} className={getLinkClass}>Мясные</NavLink>
                        <NavLink to={"/open" + location.search} className={getLinkClass}>Открытые</NavLink>
                    </nav>
                </div>
                <div className="sort">
                    <b>Сортировка по: </b>
                    <span onClick={showSortLabel}>{sort.sortMode || "умолчанию"}</span>
                {
                sort.sortSelection && 
                    <div className="sort-list">
                        <ul>
                            <li onClick={sortStart} className={!sort.sortMode ? "active" : null}>умолчанию</li>
                            <li onClick={sortStart} className={sort.sortMode === "цене (по убыванию)" ? "active" : null}>цене (по убыванию)</li>
                            <li onClick={sortStart} className={sort.sortMode === "цене (по возрастанию)" ? "active" : null}>цене (по возрастанию)</li>
                        </ul>
                    </div>
                }
                </div>
            </div>
        );
        // eslint-disable-next-line 
    }, [sort.sortSelection, sort.sortMode]
    );
    
    return myShopCategory;
};
