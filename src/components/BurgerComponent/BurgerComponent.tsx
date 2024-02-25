import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import styles from "./BurgerComponent.module.css";
import { remove } from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { useRef } from "react";
import { IIngidient } from "../../services/rtk/rtkQuerry/stellarApiTypes";
import { DnDElement } from "../../utils/types";
import { useAppDispatch } from "../../services/rtk/store";

type Props = {
    ingredient: IIngidient;
    i: number;
    moveCards: (dragIndex: number, hoverIndex: number) => void;
};

const BurgerComponent = ({ ingredient, i, moveCards }: Props) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLLIElement>(null);
    // eslint-disable-next-line
    const [_, drop] = useDrop<DnDElement, DnDElement, unknown>({
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

            const hoverClientY = clientOffset
                ? clientOffset.y - hoverBoundingRect.top
                : 0;

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

    const [{ isDragging }, drag] = useDrag<
        { id?: string; index: number },
        { id?: string; index: number },
        { isDragging: unknown }
    >({
        type: "component",
        item: () => {
            return { id: ingredient.id, index: i };
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
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient["image_mobile"]}
                handleClose={() => dispatch(remove(ingredient))}
            />
        </li>
    );
};

export { BurgerComponent };
