import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.css";
import PropTypes from "prop-types";

type Props = { current: string; setCurrent: (curent: string) => void };

const Tabs = ({ current, setCurrent }: Props) => {
    return (
        <div className={`${styles.tabs} mt-5`}>
            <Tab
                value="Булки"
                active={current === "Булки"}
                onClick={() => setCurrent("Булки")}
            >
                Булки
            </Tab>
            <Tab
                value="Соусы"
                active={current === "Соусы"}
                onClick={() => setCurrent("Соусы")}
            >
                Соусы
            </Tab>
            <Tab
                value="Начинки"
                active={current === "Начинки"}
                onClick={() => setCurrent("Начинки")}
            >
                Начинки
            </Tab>
        </div>
    );
};

Tabs.propTypes = {
    current: PropTypes.string.isRequired,
    setCurrent: PropTypes.func.isRequired,
};

export { Tabs };
