import styles from "./BurgerComponents.module.css";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import OrderDetails from "../OrderInfo/OrderDetails";
// import { postOrder } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { BurgerComponent } from "../BurgerComponent/BurgerComponent";
import {
    add,
    burgerComponentsSelector,
    initIngredients,
} from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { v4 as uuid } from "uuid";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/functions";

function BurgerComponents({ handleModalOpen }) {
    const ingredients = useSelector(burgerComponentsSelector);
    const dispatch = useDispatch();
    const [postOrder] = stellarApi.usePostOrderMutation();
    const [getUserQuery, userData] = stellarApi.useLazyGetUserQuery();
    const navigate = useNavigate();

    const [{ isHover }, drop] = useDrop({
        accept: "ingredient",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if (
                item.type === "bun" &&
                ingredients.find((el) => el._id === item._id)
            )
                return;
            return dispatch(add({ ...item, id: uuid() }));
        },
    });

    let { bun, mains } = useMemo(() => {
        return {
            bun: ingredients.find((item) => item.type === "bun") || null,
            mains: ingredients.filter((item) => item.type !== "bun") || null,
        };
    }, [ingredients]);

    const makeOrder = async () => {
        await getUserQuery();
        if (!userData) return navigate("/login");

        let itemsList = [bun, ...mains, bun];

        const order = itemsList.map((ing) => ing?._id);

        postOrder({ ingredients: order })
            .then((res) => {
                dispatch(initIngredients([]));
                return handleModalOpen(
                    <OrderDetails
                        name={res?.data.name}
                        orderNum={res?.data?.order?.number}
                    />
                );
            })
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
            <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                <ul className={styles.componentsList}>
                    {mains.map((ing, i) => {
                        return (
                            <BurgerComponent
                                key={ing.id}
                                ingredient={ing}
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
                    disabled={!bun}
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
