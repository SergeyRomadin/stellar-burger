import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientItem.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { memo } from "react";
import { useDrag } from "react-dnd";

function IngredientItem({ item, count, onClick }) {
    const [_, drag] = useDrag({
        type: "ingredient",
        item,
    });

    return (
        <li onClick={onClick} className={styles.listItem} ref={drag}>
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

IngredientItem.propTypes = {
    item: ingredientPropType,
    count: PropTypes.number,
    onClick: PropTypes.func,
};

export default memo(IngredientItem);
