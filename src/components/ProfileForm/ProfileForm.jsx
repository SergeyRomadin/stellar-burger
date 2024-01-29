import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import styles from "../Pages/Profile/Profile.module.css";

export const ProfileForm = () => {
    const [valueName, setValueName] = useState("");
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState("");
    const inputPasswordRef = useRef(null);
    const inputLoginRef = useRef(null);
    const inputNameRef = useRef(null);
    const [nameFocus, setNameFocus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const { data: profileData } = stellarApi.useGetUserQuery();
    const [patchUserQuery] = stellarApi.usePatchUserMutation();

    const isDisabledBtn =
        valueLogin === profileData?.user.email &&
        valueName === profileData?.user.name;

    useEffect(() => {
        if (profileData) {
            setValueName(profileData.user.name || "");
            setValueLogin(profileData.user.email || "");
        }
    }, [profileData]);

    const onIconClick = (ref, setFunc, isFocus) => () => {
        setTimeout(() => ref.current.focus(), 190);
        if (isFocus) setFunc("");
    };

    const onSubmit = () => {
        const reqBody = Object.fromEntries(
            Object.entries({
                name: valueName,
                email: valueLogin,
                password: valuePassword,
                // eslint-disable-next-line
            }).filter(([_, v]) => v && v != null && v != "")
        );
        patchUserQuery(reqBody);
    };

    const onCancel = () => {
        setValueName(profileData.user.name || "");
        setValueLogin(profileData.user.email || "");
    };

    const onFocus = (setFunc, value, ref, time) => () => {
        if (value) setTimeout(() => ref.current.focus(), 0);

        setTimeout(() => {
            setFunc(value);
        }, time);
    };

    return (
        <div className={styles.form}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => setValueName(e.target.value)}
                icon={nameFocus ? "CloseIcon" : "EditIcon"}
                value={valueName}
                name={"name"}
                error={false}
                ref={inputNameRef}
                onFocus={onFocus(setNameFocus, true, inputNameRef, 0)}
                onBlur={onFocus(setNameFocus, false, inputNameRef, 180)}
                onIconClick={onIconClick(inputNameRef, setValueName, nameFocus)}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Input
                type={"text"}
                placeholder={"Логин"}
                onChange={(e) => setValueLogin(e.target.value)}
                icon={loginFocus ? "CloseIcon" : "EditIcon"}
                value={valueLogin}
                name={"email"}
                ref={inputLoginRef}
                error={false}
                onIconClick={onIconClick(
                    inputLoginRef,
                    setValueLogin,
                    loginFocus
                )}
                onFocus={onFocus(setLoginFocus, true, inputLoginRef, 0)}
                onBlur={onFocus(setLoginFocus, false, inputLoginRef, 180)}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={(e) => setValuePassword(e.target.value)}
                icon={passwordFocus ? "CloseIcon" : "EditIcon"}
                value={valuePassword}
                name={"password"}
                error={false}
                ref={inputPasswordRef}
                onFocus={onFocus(setPasswordFocus, true, inputPasswordRef, 0)}
                onBlur={onFocus(setPasswordFocus, false, inputPasswordRef, 180)}
                onIconClick={onIconClick(
                    inputPasswordRef,
                    setValuePassword,
                    passwordFocus
                )}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1 pt-6"
            />
            <div className={styles.mlAuto}>
                <Button
                    disabled={isDisabledBtn}
                    extraClass="mt-6"
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={onCancel}
                >
                    Отмена
                </Button>
                <Button
                    disabled={isDisabledBtn}
                    extraClass="mt-6"
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onSubmit}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
