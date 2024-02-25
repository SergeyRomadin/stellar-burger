import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../Pages/Feed/Feed.module.css";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Order } from "../../services/rtk/rtkQuerry/stellarApiTypes";
import { ReactNode, useMemo } from "react";
import { HandleModalOpenFn } from "../../utils/types";

const OredersList = ({
    orders = [],
    openModal,
}: {
    orders: Order[];
    openModal: HandleModalOpenFn;
}) => {
    return (
        <div className={`${styles.flex} ${styles.feedBar} pr-4 custom-scroll`}>
            <ul className={`${styles.fullWidth}`}>
                {orders?.map((order) => (
                    <Card key={order._id} order={order} openModal={openModal} />
                ))}
            </ul>
        </div>
    );
};

const Card = ({
    order,
    openModal,
}: {
    order: Order;
    openModal: HandleModalOpenFn;
}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data: ingredients } = stellarApi.useGetIngredientsQuery("");
    const ingridientsArr = order.ingredients.map((orderIng) => {
        return ingredients?.find((ing) => ing._id === orderIng);
    });

    const mapIngrArr: ReactNode[] = useMemo(
        () =>
            ingridientsArr
                .map((el, i, arr) => {
                    if (i < 5)
                        return (
                            <div
                                key={i}
                                style={{
                                    translate: i * -15,
                                    zIndex: arr.length - i,
                                }}
                                className={`${styles.ingridient}`}
                            >
                                <img
                                    alt={el?.name}
                                    height="90%"
                                    src={el?.image_mobile}
                                />
                            </div>
                        );

                    if (i === 5)
                        return (
                            <div
                                key={i}
                                style={{
                                    translate: i * -15,
                                    zIndex: arr.length - i,
                                }}
                                className={`${styles.ingridient} `}
                            >
                                {arr.length !== 6 ? (
                                    <>
                                        <img
                                            height="90%"
                                            className={styles.opacity50}
                                            src={el?.image_mobile}
                                            alt={el?.name}
                                        />

                                        <span
                                            className={`text text_type_digits-default ${styles.absoluteCenter}`}
                                        >
                                            +{arr.length - 1 - i}
                                        </span>
                                    </>
                                ) : (
                                    <img
                                        height="90%"
                                        src={el?.image_mobile}
                                        alt={el?.name}
                                    />
                                )}
                            </div>
                        );
                    return undefined;
                })
                .filter((el) => el),
        [ingridientsArr]
    );

    return (
        <li className="pb-4">
            <div
                className={`${styles.card}`}
                onClick={() => {
                    openModal();

                    navigate(`${pathname}/${order.number}`, {
                        state: { root: true },
                    });
                }}
            >
                <div
                    className={`${styles.flex} ${styles.spaceBetween} ${styles.fullWidth}`}
                >
                    <p className="text text_type_digits-default">#034535</p>
                    <p className={`text text_type_main-default`}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </p>
                </div>
                <h3
                    className={`text text_type_main-medium pt-6 ${styles.maxWidth}`}
                >
                    {order.name}
                </h3>
                <div className={`${styles.flex} ${styles.spaceBetween} pt-6`}>
                    <div className={`${styles.flex}`}>{mapIngrArr}</div>

                    <div className={`${styles.flex} ${styles.spaceBetween}`}>
                        <span className="text text_type_digits-default">
                            {ingridientsArr.reduce(
                                (acc, curr) => acc + (curr?.price ?? 0),
                                0
                            )}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </li>
    );
};

export { OredersList };
