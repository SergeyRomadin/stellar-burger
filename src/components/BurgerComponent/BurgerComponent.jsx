import {
    CurrencyIcon,
    DeleteIcon,
    LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerComponent.module.css";

function BurgerComponent({ ingridient, type }) {
    return (
        <div
            className={`${styles.component} ${
                type === "topBun" && styles.topBun + " mb-4"
            } ${type === "bottomBun" && styles.bottomBun + " mb-4"} ${
                !type && "ml-2"
            } pt-4 pb-4 pl-6 pr-8`}
        >
            <img
                className={`${styles.componentImg}`}
                src={`${ingridient["image_mobile"]}`}
                alt={`${ingridient.name}`}
            />
            <div className={`${styles.componentName}`}>
                <h3 className={`text text_type_main-default pl-5`}>
                    {ingridient.name} {type === "topBun" && "(верх)"}{" "}
                    {type === "bottomBun" && "(низ)"}
                </h3>
            </div>
            <div className={`pl-5 pr-5 ${styles.componentPrice}`}>
                <span className="text text_type_digits-default pr-2">
                    {ingridient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.iconContainer}>
                {ingridient.type === "bun" ? (
                    <LockIcon type="secondary" />
                ) : (
                    <DeleteIcon />
                )}
            </div>
        </div>
    );
}

export default BurgerComponent;
