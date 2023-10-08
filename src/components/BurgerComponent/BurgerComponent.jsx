import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { remove } from "../../services/rtk/igredientsSlice/ingredientsSlice";
import { useDispatch } from "react-redux";
import styles from "./BurgerComponent.module.css";

export const BurgerComponent = ({ ingridient, i }) => {
    const dispatch = useDispatch();
    const [{ isDrag }, drag, dragPreview] = useDrag({
        type: "ingridient",
        ingridient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    const [{ isHover }, drop] = useDrop({
        accept: "ingridient",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if (item.type === "bun" && item.count > 0) return;
            // return dispatch(add(item));
        },
    });

    return (
        <li
            ref={drop}
            className={` ${isDrag && styles.displayNone}`}
            // className={`${styles.componentsListItem} pb-4`}
            key={ingridient._id + i}
        >
            <div
                ref={drag}
                className={`${styles.componentsListItem} ${
                    isHover && styles.translate
                } pb-4`}
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
            </div>
        </li>
    );
};
