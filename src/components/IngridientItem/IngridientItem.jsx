import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngridientItem.module.css";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";
import { memo } from "react";

function IngridientItem({ item, count, onClick }) {
    return (
        <li onClick={onClick} className={styles.listItem}>
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
    item: ingridientPropType.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func,
};

export default memo(IngridientItem);
