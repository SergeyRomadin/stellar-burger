import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
// import { remove } from "../../services/rtk/igredientsSlice/ingredientsSlice";
import { useDispatch } from "react-redux";
import styles from "./BurgerComponent.module.css";
import {
    moveCards,
    remove,
} from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { useRef } from "react";

export const BurgerComponent = ({ ingridient, i, moveCards }) => {
    const dispatch = useDispatch();

    // const [{ isDrag }, drag, dragPreview] = useDrag({
    //     type: "ingridient",
    //     item: ingridient,
    //     collect: (monitor) => ({
    //         isDrag: monitor.isDragging(),
    //     }),
    // });

    // const [{ isHover }, drop] = useDrop({
    //     accept: "ingridient",
    //     collect: (monitor) => ({
    //         isHover: monitor.isOver(),
    //     }),
    //     drop(item) {
    //         console.log(item);
    //         // if (item.type === "bun" && item.count > 0) return;
    //         // return dispatch(add(item));
    //     },
    // });
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
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCards(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
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
            // className={`${styles.componentsListItem} pb-4`}
            key={ingridient.id}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass="ml-2"
                key={ingridient._id}
                isLocked={false}
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient["image_mobile"]}
                handleClose={() => dispatch(remove(ingridient))}
            />
        </li>
    );
};
