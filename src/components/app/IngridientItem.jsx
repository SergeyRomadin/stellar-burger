import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngridients.module.css";

function IngridientItem({ item, count }) {
    return (
        <li className={styles.listItem}>
            {count && <Counter count={count} size="default" extraClass="m-1" />}
            <img
                className="pl-4 pr-4"
                src={`${item.image}`}
                alt={`${item.name}`}
            />
            <div className={`pt-1 ${styles.itemPrice}`}>
                <span className="text text_type_digits-default pr-1">
                    {item.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className="text text_type_main-default pt-1">{item.name}</h3>
        </li>
    );
}

export default IngridientItem;
