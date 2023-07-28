import styles from "./BurgerIngridients.module.css";
import { Tabs } from "../Tabs";
import IngridientItem from "../IngridientItem/IngridientItem";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";
import { memo, useMemo } from "react";
import IngridientDetails from "../IngridientDetails/IngridientDetails";

function BurgerIngridients({ ingridients, handleModalOpen }) {
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

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
            <Tabs />
            <div
                className={`custom-scroll mt-10 ${styles.ingridientsContainer}`}
            >
                <h2 className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {buns.map((item, i) => (
                        <IngridientItem
                            count={1}
                            key={item._id + i}
                            item={item}
                            onClick={() =>
                                handleModalOpen(
                                    <IngridientDetails ingridient={item} />
                                )
                            }
                        />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {sauces.map((item, i) => (
                        <IngridientItem
                            key={item._id + i}
                            item={item}
                            onClick={() =>
                                handleModalOpen(
                                    <IngridientDetails ingridient={item} />
                                )
                            }
                        />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {mains.map((item, i) => (
                        <IngridientItem
                            count={1}
                            key={item._id + i}
                            item={item}
                            onClick={() =>
                                handleModalOpen(
                                    <IngridientDetails ingridient={item} />
                                )
                            }
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(ingridientPropType).isRequired,
    handleModalOpen: PropTypes.func,
};

export default memo(BurgerIngridients);
