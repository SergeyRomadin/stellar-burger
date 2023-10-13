import styles from "./BurgerComponents.module.css";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import OrderDetails from "../OrderInfo/OrderDetails";
import { postOrder } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { BurgerComponent } from "../BurgerComponent/BurgerComponent";
import {
    add,
    burgerComponentsSelector,
    initIngredients,
} from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { v4 as uuid } from "uuid";

function BurgerComponents({ handleModalOpen }) {
    const ingridients = useSelector(burgerComponentsSelector);
    const dispatch = useDispatch();

    const [{ isHover }, drop] = useDrop({
        accept: "ingridient",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if (
                item.type === "bun" &&
                ingridients.find((item) => item.type === "bun")
            )
                return;
            return dispatch(add({ ...item, id: uuid() }));
        },
    });

    let { bun, mains } = useMemo(() => {
        return {
            bun: ingridients.find((item) => item.type === "bun") || null,
            mains: ingridients.filter((item) => item.type !== "bun") || null,
        };
    }, [ingridients]);

    const makeOrder = () => {
        let itemsList = [];

        if (mains && bun) {
            itemsList = mains?.reduce(
                (acc, ing) => {
                    return [...acc, ...ing];
                },
                [bun]
            );
        }

        itemsList.push(bun);

        const order = itemsList.map((ing) => ing?._id);

        postOrder(JSON.stringify({ ingredients: order }))
            .then((res) =>
                handleModalOpen(
                    <OrderDetails name={res.name} orderNum={res.order.number} />
                )
            )
            .catch((err) => console.log(err));
    };

    const moveCards = (dragIndex, hoverIndex) => {
        const dragCard = mains[dragIndex];
        const newCards = [...mains];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
        dispatch(initIngredients(bun ? [bun, ...newCards] : [...newCards]));
    };

    return (
        <div className={`${styles.wrapper} pt-25 pl-10`} ref={drop}>
            <div className="pl-8">
                {bun && (
                    <ConstructorElement
                        extraClass="mb-4"
                        key={bun.id}
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun["image_mobile"]}
                    />
                )}
            </div>
            <div className={`custom-scroll ${styles.ingridientsContainer}`}>
                <ul className={styles.componentsList}>
                    {mains.map((ing, i) => {
                        return (
                            <BurgerComponent
                                key={ing.id}
                                ingridient={ing}
                                i={i}
                                moveCards={moveCards}
                            />
                        );
                    })}
                </ul>
            </div>
            <div className="pl-8 pt-4">
                {bun && (
                    <ConstructorElement
                        key={bun.id}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun["image_mobile"]}
                    />
                )}
            </div>
            <div className={`${styles.orderContainer} pt-10`}>
                <span className="text text_type_digits-medium pr-2">
                    {mains.reduce((prev, cur, curInd, arr) => {
                        return prev + cur.price;
                    }, 0) + (bun && bun?.price * 2)}
                </span>
                <div className={`${styles.orderIconContainer} mr-10`}>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    extraClass="mr-4"
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={makeOrder}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerComponents.propTypes = {
    handleModalOpen: PropTypes.func,
};

export default memo(BurgerComponents);
