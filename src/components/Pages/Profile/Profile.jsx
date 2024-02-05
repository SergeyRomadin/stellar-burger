import styles from "./Profile.module.css";

import { stellarApi } from "../../../services/rtk/rtkQuerry/stellarApi";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Profile() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [logoutQuery] = stellarApi.useLogoutMutation();

    return (
        <section className={styles.wrapper}>
            <div className={styles.sidebar}>
                <ul>
                    <li
                        className={`text text_type_main-medium ${
                            pathname !== "/profile" && "text_color_inactive"
                        }`}
                    >
                        <button
                            className={`${styles.textBtn} text text_type_main-medium`}
                            type="button"
                            onClick={() => navigate("/profile")}
                        >
                            Профиль
                        </button>
                    </li>
                    <li
                        className={`text text_type_main-medium  ${
                            pathname !== "/profile/orders" &&
                            "text_color_inactive"
                        }`}
                    >
                        <button
                            className={`text text_type_main-medium ${styles.textBtn}`}
                            type="button"
                            onClick={() => navigate("/profile/orders")}
                        >
                            История заказов
                        </button>
                    </li>
                    <li
                        className={`text text_type_main-medium text_color_inactive`}
                    >
                        <button
                            className={`${styles.textBtn} text text_type_main-medium text_color_inactive `}
                            type="button"
                            onClick={async () => {
                                await logoutQuery();
                                setTimeout(() => navigate("/login"), 0);
                            }}
                        >
                            Выход
                        </button>
                    </li>
                    <li className={`pt-20`}>
                        <p
                            className={`text text_type_main-small text_color_inactive`}
                        >
                            В этом разделе вы можете изменить свои персональные
                            данные
                        </p>
                    </li>
                </ul>
            </div>
            <Outlet />
        </section>
    );
}

export default Profile;
