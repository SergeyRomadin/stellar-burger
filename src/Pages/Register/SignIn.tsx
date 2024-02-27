import styles from "../Register.module.css";
import { FormEvent, useRef, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

function SignIn() {
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [loginQuery] = stellarApi.useLoginMutation();
    const navigate = useNavigate();

    const onIconClick = () => {
        setTimeout(() => inputPasswordRef.current?.focus(), 0);
        setShowPassword(!showPassword);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginQuery({
            email: valueLogin,
            password: valuePassword,
        });
        navigate("/");
    };

    return (
        <form onSubmit={onSubmit} className={styles.wrapper}>
            <h2 className={`text text_type_main-medium`}>Вход</h2>

            <Input
                type={"text"}
                placeholder={"E-mail"}
                onChange={(e) => setValueLogin(e.target.value)}
                value={valueLogin}
                name={"name"}
                error={false}
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
                htmlType="submit"
                type="primary"
                size="large"
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
        </form>
    );
}

export default SignIn;
