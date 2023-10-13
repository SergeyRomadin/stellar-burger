import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./BurgerComponent.module.css";
import { remove } from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { useRef } from "react";
import PropTypes from "prop-types";

const BurgerComponent = ({ ingridient, i, moveCards }) => {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = i;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCards(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: () => {
            return { id: ingridient.id, index: i };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <li
            ref={ref}
            className={` ${isDragging && styles.displayNone} ${
                styles.componentsListItem
            }  pb-4`}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass="ml-2"
                isLocked={false}
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient["image_mobile"]}
                handleClose={() => dispatch(remove(ingridient))}
            />
        </li>
    );
};

BurgerComponent.propTypes = {
    moveCards: PropTypes.func,
    i: PropTypes.number,
    ingridient: PropTypes.object,
};

export { BurgerComponent };
