import styles from "../Register.module.css";
import { useRef, useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { stellarApi } from "../../../services/rtk/rtkQuerry/stellarApi";

function ResetPassword() {
    const [valuePassword, setValuePassword] = useState("");
    const [valueCode, setValueCode] = useState("");
    const inputPasswordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const [confirmNewPasswordQuery, { data }] =
        stellarApi.useConfirmNewPassMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (e) => {
        e.preventDefault();
        confirmNewPasswordQuery({ password: valuePassword, token: valueCode });
        if (data?.success) {
            navigate("/login");
        }
    };

    const onIconClick = () => {
        setTimeout(() => inputPasswordRef.current.focus(), 0);
        setShowPassword(!showPassword);
    };

    if (location.state !== "forgotToReset") {
        return <Navigate to="/" replace />;
    }

    return (
        <form onSubmit={onSubmit} className={styles.wrapper}>
            <h2 className={`text text_type_main-medium`}>
                Восстановление пароля
            </h2>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={"Введите новый пароль"}
                onChange={(e) => setValuePassword(e.target.value)}
                icon={showPassword ? "HideIcon" : "ShowIcon"}
                value={valuePassword}
                name={"newPassword"}
                error={false}
                ref={inputPasswordRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Input
                type={"text"}
                placeholder={"Введите код из письма"}
                onChange={(e) => setValueCode(e.target.value)}
                value={valueCode}
                name={"code"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Button
                disabled={!valueCode || !valuePassword}
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

export default ResetPassword;
