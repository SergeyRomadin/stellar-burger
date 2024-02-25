import styles from "./Feed.module.css";
import { OredersList } from "../../components/OrdersList/OrdersList";
import { websocketApi } from "../../services/rtk/rtkQuerry/websocketApi";
import { Outlet } from "react-router-dom";
import { HandleModalOpenFn } from "../../utils/types";

type Props = { openModal: HandleModalOpenFn };

function Feed({ openModal }: Props) {
    const { data } = websocketApi.useGetOrdersQuery("/all");

    return (
        <section className={styles.wrapper}>
            <h2 className={`text text_type_main-large pb-5 ${styles.maxWidth}`}>
                Лента заказов
            </h2>
            <div className={`${styles.flex} ${styles.fullWidth}`}>
                <div className={`${styles.halfWidth}`}>
                    <OredersList
                        orders={data?.orders ?? []}
                        openModal={openModal}
                    />
                </div>
                <div
                    className={`${styles.flex} ${styles.feedBar} ${styles.halfWidth} ${styles.fdColumn} pl-15 custom-scroll`}
                >
                    <div
                        className={`${styles.flex} ${styles.fullWidth} mb-15 `}
                    >
                        <div className={`${styles.fullWidth} mr-9`}>
                            <span className="text text_type_main-medium">
                                Готовы:
                            </span>
                            <ul className={`${styles.ordersList} mt-6`}>
                                {data?.orders?.map((order, i) => {
                                    if (order.status === "done" && i < 5)
                                        return (
                                            <li key={order._id}>
                                                <span
                                                    className={`text text_type_digits-default ${styles.colorSuccess}`}
                                                >
                                                    {order.number}
                                                </span>
                                            </li>
                                        );
                                })}
                            </ul>
                        </div>
                        <div className={`${styles.fullWidth}`}>
                            <span className="text text_type_main-medium">
                                В работе:
                            </span>
                            <ul className={`${styles.ordersList} mt-6`}>
                                {data?.orders?.map((order, i) => {
                                    if (order.status !== "done" && i < 5)
                                        return (
                                            <li key={order._id}>
                                                <span
                                                    className={`text text_type_digits-default`}
                                                >
                                                    {order.number}
                                                </span>
                                            </li>
                                        );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div
                        className={`${styles.flex} ${styles.fdColumn} ${styles.fullWidth} mb-15`}
                    >
                        <span className="text text_type_main-medium">
                            Выполнено за все время:
                        </span>
                        <span
                            className={`text text_type_digits-large ${styles.digitsShadow}`}
                        >
                            {data?.total}
                        </span>
                    </div>
                    <div
                        className={`${styles.flex} ${styles.fdColumn} ${styles.fullWidth} mb-15`}
                    >
                        <span className="text text_type_main-medium">
                            Выполнено за все время:
                        </span>
                        <span
                            className={`text text_type_digits-large ${styles.digitsShadow}`}
                        >
                            {data?.totalToday}
                        </span>
                    </div>
                </div>
            </div>
            <Outlet />
        </section>
    );
}

export default Feed;
