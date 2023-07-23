import {
    CurrencyIcon,
    DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";
import { Tabs } from "./Tabs";
import IngridientItem from "./IngridientItem";

function BurgerIngridients({ ingridients }) {
    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
            <Tabs />
            <div
                className={`custom-scroll mt-10 ${styles.ingridientsContainer}`}
            >
                <h2 className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {ingridients.map((item, i) => {
                        if (item.type === "bun") {
                            return (
                                <IngridientItem
                                    key={item._id + i}
                                    item={item}
                                />
                            );
                        }
                    })}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {ingridients.map((item, i) => {
                        if (item.type === "sauce") {
                            return (
                                <IngridientItem
                                    key={item._id + i}
                                    item={item}
                                />
                            );
                        }
                    })}
                </ul>
                <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                <ul className={`${styles.ingridientsList} pl-4`}>
                    {ingridients.map((item, i) => {
                        if (item.type === "main") {
                            return (
                                <IngridientItem
                                    key={item._id + i}
                                    item={item}
                                />
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
}

export default BurgerIngridients;
