import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderInfo.module.css";
import { Order } from "../../services/rtk/rtkQuerry/websocketApi";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import { useLocation, useParams } from "react-router-dom";

export const OrderInfo = () => {
    const { id = "" } = useParams();

    const { data: order } = stellarApi.useGetOrderQuery(id);
    const { data: ingredients } = stellarApi.useGetIngredientsQuery("");
    const ingridientsArr = order?.ingredients?.map((orderIng) => {
        return ingredients?.find((ing) => ing._id === orderIng);
    });
    const ingridientsSet = Array.from(new Set(ingridientsArr));

    const countedIngridients = ingridientsSet?.map((currIngridient) => {
        const sameIngridients = ingridientsArr?.filter(
            (filterIngridient) =>
                filterIngridient?.name === currIngridient?.name
        );

        return { ...currIngridient, count: sameIngridients?.length };
    });
    console.log(countedIngridients);

    return (
        <div className={`${styles.wrapper}`}>
            <h3
                className={`text text_type_digits-default pb-10  ${styles.textAlignCenter}`}
            >
                #{order?.number}
            </h3>

            <h1
                className={`text text_type_main-medium pb-3 ${styles.maxWidth}`}
            >
                {order?.name}
            </h1>
            <p
                className={`text text_type_main-default pb-15 ${
                    order?.status === "done" && styles.colorSuccess
                }`}
            >
                {order?.status === "done" ? "Выполнен" : "Готовится"}
            </p>

            <h2
                className={`text text_type_main-medium pb-6 ${styles.maxWidth}`}
            >
                Состав:
            </h2>

            <ul
                className={`${styles.maxWidth} ${styles.ingridientsList} pr-6 pb-10`}
            >
                {countedIngridients?.map((ingridient, i) => {
                    return (
                        <li
                            key={i}
                            className={`${styles.flex} ${styles.maxWidth} ${styles.alignItemsCenter}`}
                        >
                            <div className={`${styles.ingridient} mr-4`}>
                                <img
                                    height="90%"
                                    src={ingridient?.image_mobile}
                                />
                            </div>
                            <p className={`text text_type_main-default`}>
                                {ingridient?.name}
                            </p>
                            <div
                                className={`${styles.flex} ${styles.spaceBetween} ${styles.mlAuto}  pl-4`}
                            >
                                <span className="text text_type_digits-default mr-2">
                                    {ingridient?.count} X {ingridient?.price}
                                </span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div
                className={`${styles.flex} ${styles.spaceBetween} ${styles.alignItemsCenter}`}
            >
                <p
                    className={`text text_type_main-default text_color_inactive`}
                >
                    <FormattedDate date={new Date(order?.createdAt ?? "")} />
                </p>
                <div className={`${styles.flex} ${styles.spaceBetween}`}>
                    <span className="text text_type_digits-default pr-2">
                        {ingridientsArr?.reduce(
                            (acc, curr) => acc + (curr?.price ?? 0),
                            0
                        )}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};
