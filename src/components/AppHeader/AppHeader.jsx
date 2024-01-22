import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={styles.appHeader}>
            <div className="content-wrapper">
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li className={styles.listItem && "pr-10"}>
                            <NavLink to="/" className={styles.link}>
                                {({ isActive }) => (
                                    <>
                                        <BurgerIcon
                                            type={
                                                isActive
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        />
                                        <span
                                            className={`text text_type_main-default pl-2 ${
                                                isActive &&
                                                "text_color_inactive"
                                            }`}
                                        >
                                            Конструктор
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className={styles.listItem && "pr-10"}>
                            <NavLink to="/feed" className={styles.link}>
                                {({ isActive }) => (
                                    <>
                                        <ListIcon
                                            type={
                                                isActive
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        />
                                        <span
                                            className={`text text_type_main-default pl-2 ${
                                                isActive &&
                                                "text_color_inactive"
                                            }`}
                                        >
                                            Лента заказов
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <NavLink to="/login" className={styles.link}>
                                {({ isActive }) => (
                                    <>
                                        <ProfileIcon
                                            type={
                                                isActive
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        />
                                        <span
                                            className={`text text_type_main-default pl-2 ${
                                                isActive &&
                                                "text_color_inactive"
                                            }`}
                                        >
                                            Личный кабинет
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
