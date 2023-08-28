import styles from "./BurgerComponents.module.css";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import OrderDetails from "../OrderInfo/OrderDetails";
import { postOrder } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import {
    ingredientsSelector,
    remove,
} from "../../services/rtk/igredientsSlice/ingredientsSlice";

function BurgerComponents({ handleModalOpen }) {
    const ingridients = useSelector(ingredientsSelector);
    const dispatch = useDispatch();

    const { bun, mains } = useMemo(() => {
        return {
            bun:
                ingridients.find(
                    (item) => item.type === "bun" && item.count > 0
                ) || null,
            mains: ingridients
                .filter((item) => item.type !== "bun" && item.count > 0)
                .map((ing) => {
                    let result = [];
                    for (let i = 0; i < ing.count; i++) {
                        result.push(ing);
                    }
                    return result;
                }),
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

    return (
        <div className={`${styles.wrapper} pt-25 pl-10`}>
            <div className="pl-8">
                {bun && (
                    <ConstructorElement
                        extraClass="mb-4"
                        key={bun._id}
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
                        return ing.map((ingridient, i) => (
                            <li
                                className={`${styles.componentsListItem} pb-4`}
                                key={ingridient._id + i}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    extraClass="ml-2"
                                    key={ingridient._id}
                                    isLocked={false}
                                    text={ingridient.name}
                                    price={ingridient.price}
                                    thumbnail={ingridient["image_mobile"]}
                                    handleClose={() =>
                                        dispatch(remove(ingridient))
                                    }
                                />
                            </li>
                        ));
                    })}
                </ul>
            </div>
            <div className="pl-8 pt-4">
                {bun && (
                    <ConstructorElement
                        key={bun._id}
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
                        if (cur.count === 0) return prev;
                        if (cur?.price) return (prev += cur.price);
                        let acc = 0;
                        cur.forEach((ing) => {
                            acc += ing.count * ing.price;
                        });
                        return prev + acc;
                    }, 0) + (bun && bun?.price)}
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
