import styles from "./Profile.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useRef, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
    const [valueName, setValueName] = useState("");
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputPasswordRef = useRef(null);

    const onIconClick = () => {
        setTimeout(() => inputPasswordRef.current.focus(), 0);
        setShowPassword(!showPassword);
    };
    return (
        <section className={styles.wrapper}>
            <div className={styles.sidebar}>
                <ul>
                    <li className={`text text_type_main-medium`}>Профиль</li>
                    <li
                        className={`text text_type_main-medium text_color_inactive`}
                    >
                        История заказов
                    </li>
                    <li
                        className={`text text_type_main-medium text_color_inactive`}
                    >
                        Выход
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
            <div className={styles.form}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={(e) => setValueName(e.target.value)}
                    icon={"EditIcon"}
                    value={valueName}
                    name={"name"}
                    error={false}
                    // onIconClick={onIconClick}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="ml-1 pt-6"
                />
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) => setValueLogin(e.target.value)}
                    icon={"EditIcon"}
                    value={valueLogin}
                    name={"email"}
                    error={false}
                    // onIconClick={onIconClick}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="ml-1 pt-6"
                />
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={"Пароль"}
                    onChange={(e) => setValuePassword(e.target.value)}
                    icon={"EditIcon"}
                    value={valuePassword}
                    name={"password"}
                    error={false}
                    ref={inputPasswordRef}
                    onIconClick={onIconClick}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="ml-1 pt-6"
                />
            </div>
        </section>
    );
}

Profile.propTypes = {
    // ingredient: ingredientPropType.isRequired,
};

export default Profile;
