import styles from "./BurgerIngridients.module.css";
import { Tabs } from "../Tabs";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";
import { memo, useContext, useMemo } from "react";
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import { renderItems } from "../../utils/functions";
import { IngridientsContext } from "../../context/ingridientsContext";
import IngridientItem from "../IngridientItem/IngridientItem";

function BurgerIngridients({ handleModalOpen }) {
    const [ingridients, dispatchIngridients] = useContext(IngridientsContext);

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
        if (item.type === "bun" && item.__v > 0) return;
        return dispatchIngridients({ type: "ADD", payload: item });
    };

    const renderItems = (items, handleClick) =>
        items.map((item, i) => (
            <IngridientItem
                count={item.__v || null}
                key={item._id + i}
                item={item}
                onClick={
                    () => handleClick(item)
                    // handleClick(<IngridientDetails ingridient={item} />)
                }
            />
        ));

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
            <Tabs />
            <div
                className={`custom-scroll mt-10 ${styles.ingridientsContainer}`}
            >
                <h2 className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(buns, hanleAddIngridient)}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(sauces, hanleAddIngridient)}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {renderItems(mains, hanleAddIngridient)}
                </ul>
            </div>
        </div>
    );
}

BurgerIngridients.propTypes = {
    // ingridients: PropTypes.arrayOf(ingridientPropType).isRequired,
    handleModalOpen: PropTypes.func,
};

export default memo(BurgerIngridients);
