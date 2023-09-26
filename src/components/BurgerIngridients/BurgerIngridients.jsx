import styles from "./BurgerIngridients.module.css";
import { Tabs } from "../Tabs";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import IngridientItem from "../IngridientItem/IngridientItem";
import { useSelector, useDispatch } from "react-redux";
import {
    add,
    ingredientsSelector,
} from "../../services/rtk/igredientsSlice/ingredientsSlice";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BurgerIngridients({ handleModalOpen }) {
    const [current, setCurrent] = useState("Булки");
    const ingridients = useSelector(ingredientsSelector);

    console.log(ingridients);

    const dispatch = useDispatch();

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const buns = useMemo(
        () => ingridients.filter((item) => item.type === "bun"),
        [ingridients]
    );
    const mains = useMemo(
        () => ingridients.filter((item) => item.type === "main"),
        [ingridients]
    );
    const sauces = useMemo(
        () => ingridients.filter((item) => item.type === "sauce"),
        [ingridients]
    );

    const hanleAddIngridient = (item) => {
        if (item.type === "bun" && item.count > 0) return;
        return dispatch(add(item));
    };

    const renderItems = (items, handleClick) =>
        items.map((item, i) => {
            return (
                <IngridientItem
                    count={item.count || null}
                    key={item._id + i}
                    item={item}
                    onClick={
                        () => handleClick(item)
                        // handleClick(<IngridientDetails ingridient={item} />)
                    }
                />
            );
        });

    const scrollTo = useCallback((tab) => {
        switch (tab) {
            case "Булки":
                bunsRef.current.scrollIntoView();
                break;
            case "Соусы":
                saucesRef.current.scrollIntoView();
                break;
            case "Начинки":
                mainsRef.current.scrollIntoView();
                break;
            default:
                throw new Error(`Ошибка скролла: ${tab}`);
        }
    }, []);

    const handlerScroll = (e) => {
        [bunsRef, saucesRef, mainsRef].forEach((section) => {
            const sectionTop = section.current.offsetTop;
            if (e.target.scrollTop >= sectionTop - 324) {
                setCurrent(section.current.textContent);
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
            <Tabs scrollTo={scrollTo} current={current} setCurrent={scrollTo} />

            <div
                onScroll={handlerScroll}
                className={`custom-scroll mt-10 ${styles.ingridientsContainer}`}
            >
                <h2 ref={bunsRef} className="text text_type_main-medium">
                    Булки
                </h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(buns, hanleAddIngridient)}
                </ul>
                <h2
                    ref={saucesRef}
                    className="text text_type_main-medium pt-10"
                >
                    Соусы
                </h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(sauces, hanleAddIngridient)}
                </ul>
                <h2 ref={mainsRef} className="text text_type_main-medium pt-10">
                    Начинки
                </h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(mains, hanleAddIngridient)}
                </ul>
            </div>
        </div>
    );
}

BurgerIngridients.propTypes = {
    handleModalOpen: PropTypes.func,
};

export default memo(BurgerIngridients);
