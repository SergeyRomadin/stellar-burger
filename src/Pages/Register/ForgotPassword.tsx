import styles from "../Register.module.css";
import { FormEvent, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

function ForgotPassword() {
    const [valueLogin, setValueLogin] = useState("");
    const [resetPasswordQuery] = stellarApi.useResetPasswordMutation();
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        resetPasswordQuery(valueLogin);
        navigate("/reset-password", { state: "forgotToReset" });
    };

    return (
        <form onSubmit={onSubmit} className={styles.wrapper}>
            <h2 className={`text text_type_main-medium`}>
                Восстановление пароля
            </h2>
            <Input
                type={"text"}
                placeholder={"Укажите e-mail"}
                onChange={(e) => setValueLogin(e.target.value)}
                value={valueLogin}
                name={"email"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Button
                disabled={!valueLogin}
                extraClass="mt-6"
                htmlType="submit"
                type="primary"
                size="large"
            >
                Восстановить
            </Button>

            <p
                className={`text text_type_main-default text_color_inactive pt-20`}
            >
                Вспомнили пароль?
                <Link to="/login" className={styles.link}>
                    Войти
                </Link>
            </p>
        </form>
    );
}

export default ForgotPassword;
