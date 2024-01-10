import { NavLink, useLocation, useNavigation } from "react-router-dom";
import styles from "./AppHeader.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    const path = useLocation().pathname;

    return (
        <header className={styles.appHeader}>
            <div className="content-wrapper">
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li className={styles.listItem && "pr-10"}>
                            <NavLink to="/" className={styles.link}>
                                <BurgerIcon
                                    type={
                                        path === "/" ? "primary" : "secondary"
                                    }
                                />
                                <span
                                    className={`text text_type_main-default pl-2 ${
                                        path !== "/" && "text_color_inactive"
                                    }`}
                                >
                                    Конструктор
                                </span>
                            </NavLink>
                        </li>
                        <li className={styles.listItem && "pr-10"}>
                            <NavLink to="/feed" className={styles.link}>
                                <ListIcon
                                    type={
                                        path === "/feed"
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <span
                                    className={`text text_type_main-default pl-2 ${
                                        path !== "/feed" &&
                                        "text_color_inactive"
                                    }`}
                                >
                                    Лента заказов
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <NavLink to="/login" className={styles.link}>
                                <ProfileIcon
                                    type={
                                        path === "/login"
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <span
                                    className={`text text_type_main-default pl-2 ${
                                        path !== "/login" &&
                                        "text_color_inactive"
                                    }`}
                                >
                                    Личный кабинет
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
