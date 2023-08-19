import styles from "./BurgerComponents.module.css";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";
import { memo, useContext, useMemo } from "react";
import OrderDetails from "../OrderInfo/OrderDetails";
import { IngridientsContext } from "../../context/ingridientsContext";
import { postOrder } from "../../services/api";

function BurgerComponents({ handleModalOpen }) {
    const [ingridients, dispatchIngridients] = useContext(IngridientsContext);
    const buns = useMemo(
        () => ingridients.filter((item) => item.type === "bun" && item.__v > 0),
        [ingridients]
    );
    const mains = useMemo(() => {
        const filteredMains = ingridients.filter(
            (item) => item.type !== "bun" && item.__v > 0
        );
        return filteredMains.map((ing) => {
            let result = [];
            for (let i = 0; i < ing.__v; i++) {
                result.push(ing);
            }
            return result;
        });
    }, [ingridients]);

    const order = useMemo(
        () =>
            mains.length && buns.length
                ? mains
                      ?.reduce(
                          (acc, ing) => {
                              return [...acc, ...ing];
                          },
                          [buns[0]]
                      )
                      .map((ing) => ing._id)
                : null,
        [mains, buns]
    );

    return (
        <div className={`${styles.wrapper} pt-25 pl-10`}>
            <div className="pl-8">
                {buns.map((ingridient) => (
                    <ConstructorElement
                        extraClass="mb-4"
                        key={ingridient._id}
                        type="top"
                        isLocked={true}
                        text={`${ingridient.name} (верх)`}
                        price={ingridient.price}
                        thumbnail={ingridient["image_mobile"]}
                    />
                ))}
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
                                        dispatchIngridients({
                                            type: "REMOVE",
                                            payload: ingridient,
                                        })
                                    }
                                />
                            </li>
                        ));
                    })}
                </ul>
            </div>
            <div className="pl-8 pt-4">
                {buns.map((ingridient) => (
                    <ConstructorElement
                        key={ingridient._id}
                        type="bottom"
                        isLocked={true}
                        text={`${ingridient.name} (низ)`}
                        price={ingridient.price}
                        thumbnail={ingridient["image_mobile"]}
                    />
                ))}
            </div>
            <div className={`${styles.orderContainer} pt-10`}>
                <span className="text text_type_digits-medium pr-2">
                    {mains.reduce((prev, cur, curInd, arr) => {
                        if (cur.__v === 0) return prev;
                        if (cur?.price) return (prev += cur.price);
                        let acc = 0;
                        cur.forEach((ing) => {
                            acc += ing.__v * ing.price;
                        });
                        return prev + acc;
                    }, 0) +
                        buns.reduce((prev, cur, curInd, arr) => {
                            if (cur.__v === 0) return prev;
                            if (cur?.price) return (prev += cur.price);
                        }, 0)}
                </span>
                <div className={`${styles.orderIconContainer} mr-10`}>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    extraClass="mr-4"
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => {
                        // console.log(JSON.stringify({ ingredients: order }));
                        postOrder(JSON.stringify({ ingredients: order }))
                            .then((res) =>
                                handleModalOpen(
                                    <OrderDetails
                                        name={res.name}
                                        orderNum={res.order.number}
                                    />
                                )
                            )
                            .catch((err) => console.log(err));
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerComponents.propTypes = {
    // ingridients: PropTypes.arrayOf(ingridientPropType).isRequired,
    handleModalOpen: PropTypes.func,
};

export default memo(BurgerComponents);
