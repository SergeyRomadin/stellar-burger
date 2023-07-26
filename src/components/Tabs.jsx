import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.css";

export const Tabs = () => {
    const [current, setCurrent] = useState("Булки");
    return (
        <div className={`${styles.tabs} mt-5`}>
            <Tab
                value="Булки"
                active={current === "Булки"}
                onClick={setCurrent}
            >
                Булки
            </Tab>
            <Tab
                value="Соусы"
                active={current === "Соусы"}
                onClick={setCurrent}
            >
                Соусы
            </Tab>
            <Tab
                value="Начинки"
                active={current === "Начинки"}
                onClick={setCurrent}
            >
                Начинки
            </Tab>
        </div>
    );
};
