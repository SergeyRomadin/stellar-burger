import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngridientItem.module.css";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";

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

IngridientItem.propTypes = {
    item: ingridientPropType,
    count: PropTypes.number,
};

export default IngridientItem;