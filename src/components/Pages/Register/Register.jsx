import styles from "../Register.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useRef, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { stellarApi } from "../../../services/rtk/rtkQuerry/stellarApi";

function Register() {
    const [valueName, setValueName] = useState("");
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputPasswordRef = useRef(null);
    const [registerQuery] = stellarApi.useRegisterMutation();

    const onIconClick = () => {
        setTimeout(() => inputPasswordRef.current.focus(), 0);
        setShowPassword(!showPassword);
    };

    const onSubmit = () => {
        registerQuery({
            email: valueLogin,
            name: valueName,
            password: valuePassword,
        });
    };
    return (
        <section className={styles.wrapper}>
            <h2 className={`text text_type_main-medium`}>Регистрация</h2>

            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => setValueName(e.target.value)}
                // icon={"CurrencyIcon"}
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
                placeholder={"E-mail"}
                onChange={(e) => setValueLogin(e.target.value)}
                // icon={"CurrencyIcon"}
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
                icon={showPassword ? "HideIcon" : "ShowIcon"}
                value={valuePassword}
                name={"password"}
                error={false}
                ref={inputPasswordRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Button
                disabled={!valueLogin || !valuePassword || !valueName}
                extraClass="mt-6"
                htmlType="button"
                type="primary"
                size="large"
                onClick={onSubmit}
            >
                Войти
            </Button>

            <p
                className={`text text_type_main-default text_color_inactive pt-20`}
            >
                Уже зарегистрированы?
                <Link to="/login" className={styles.link}>
                    Войти
                </Link>
            </p>
        </section>
    );
}

Register.propTypes = {
    // ingredient: ingredientPropType.isRequired,
};

export default Register;
