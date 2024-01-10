import styles from "../Register.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useRef, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function SignIn() {
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
            <h2 className={`text text_type_main-medium`}>Вход</h2>

            <Input
                type={"text"}
                placeholder={"E-mail"}
                onChange={(e) => setValueLogin(e.target.value)}
                // icon={"CurrencyIcon"}
                value={valueLogin}
                name={"name"}
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
                icon={showPassword ? "HideIcon" : "ShowIcon"}
                value={valuePassword}
                name={"name"}
                error={false}
                ref={inputPasswordRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Button
                disabled={!valueLogin || !valuePassword}
                extraClass="mt-6"
                htmlType="button"
                type="primary"
                size="large"
                // onClick={makeOrder}
            >
                Войти
            </Button>

            <p
                className={`text text_type_main-default text_color_inactive pt-20`}
            >
                Вы — новый пользователь?
                <Link to="/register" className={styles.link}>
                    Зарегистрироватсья
                </Link>
            </p>

            <p
                className={`text text_type_main-default text_color_inactive pt-4`}
            >
                Забыли пароль?
                <Link to="/forgot-password" className={styles.link}>
                    Восстановить пароль
                </Link>
            </p>
        </section>
    );
}

SignIn.propTypes = {
    // ingredient: ingredientPropType.isRequired,
};

export default SignIn;
