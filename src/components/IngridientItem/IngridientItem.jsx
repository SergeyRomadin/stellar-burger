import {
    ConstructorElement,
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngridientItem.module.css";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";
import { memo } from "react";
import { useDrag } from "react-dnd";

function IngridientItem({ item, count, onClick }) {
    const [{ isDrag }, drag, dragPreview] = useDrag({
        type: "ingridient",
        item,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const draggableAnimal = (
        <ConstructorElement
            ref={dragPreview}
            extraClass="ml-2"
            key={item._id}
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item["image_mobile"]}
            handleClose={() => {}}
        />
    );

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

IngridientItem.propTypes = {
    item: ingridientPropType.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func,
};

export default memo(IngridientItem);
