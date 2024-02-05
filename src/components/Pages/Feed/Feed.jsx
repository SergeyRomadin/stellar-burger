import styles from "./Feed.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useRef, useState } from "react";
import {
    Button,
    CurrencyIcon,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Feed() {
    const [valueName, setValueName] = useState("");
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputPasswordRef = useRef(null);

    const onIconClick = () => {
        setTimeout(() => inputPasswordRef.current.focus(), 0);
        setShowPassword(!showPassword);
    };

    const Card = () => (
        <li className="pb-4">
            <div className={styles.card}>
                <div className={`${styles.flex} ${styles.spaceBetween}`}>
                    <p className="text text_type_digits-default">#034535</p>
                    <p className={`text text_type_main-default`}>
                        Сегодня, 16:20 i-GMT+3
                    </p>
                </div>
                <h3
                    className={`text text_type_main-medium pt-6 ${styles.maxWidth}`}
                >
                    Death Star Starship Main бургер
                </h3>
                <div className={`${styles.flex} ${styles.spaceBetween} pt-6`}>
                    <div>
                        <div className={styles.ingridient}></div>
                    </div>

                    <div className={`${styles.flex} ${styles.spaceBetween}`}>
                        <span className="text text_type_digits-default">
                            157
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </li>
    );

    const arr = Array(10).fill(<Card />);
    console.log(arr);

    return (
        <section className={styles.wrapper}>
            <h2 className={`text text_type_main-large pb-5 ${styles.maxWidth}`}>
                Лента заказов
            </h2>
            <div className={styles.container}>
                <div
                    className={`${styles.flex} ${styles.feedBar} pr-2 custom-scroll`}
                >
                    <ul>{arr}</ul>
                </div>
            </div>
        </section>
    );
}

export default Feed;
