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
                            <a href="#" className={styles.link}>
                                <BurgerIcon type="primary" />
                                <span className="text text_type_main-default pl-2">
                                    Конструктор
                                </span>
                            </a>
                        </li>
                        <li className={styles.listItem && "pr-10"}>
                            <a href="#" className={styles.link}>
                                <ListIcon type="secondary" />
                                <span className="text text_type_main-default text_color_inactive pl-2">
                                    Лента заказов
                                </span>
                            </a>
                        </li>
                    </ul>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <a href="#" className={styles.link}>
                                <ProfileIcon type="secondary" />
                                <span className="text text_type_main-default text_color_inactive pl-2">
                                    Личный кабинет
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
