import styles from "./BurgerComponents.module.css";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComponents({ ingridients }) {
    return (
        <div className={`${styles.wrapper} pt-25 pl-10`}>
            <div className="pl-8">
                {ingridients.map((ingridient) => {
                    if (ingridient.type === "bun")
                        return (
                            <BurgerComponent
                                key={ingridient._id}
                                ingridient={ingridient}
                                type={"topBun"}
                            />
                        );
                })}
            </div>
            <div className={`custom-scroll ${styles.ingridientsContainer}`}>
                <ul className={styles.componentsList}>
                    {ingridients.map((ingridient, i) => {
                        if (ingridient.type !== "bun")
                            return (
                                <li
                                    className={`${styles.componentsListItem} pb-4`}
                                    key={ingridient._id + i}
                                >
                                    <DragIcon type="primary" />
                                    <BurgerComponent ingridient={ingridient} />
                                </li>
                            );
                    })}
                </ul>
            </div>
            <div className="pl-8 pt-4">
                {ingridients.map((ingridient) => {
                    if (ingridient.type === "bun")
                        return (
                            <BurgerComponent
                                key={ingridient._id}
                                ingridient={ingridient}
                                type={"bottomBun"}
                            />
                        );
                })}
            </div>
        </div>
    );
}

export default BurgerComponents;
