import styles from "./BurgerComponents.module.css";
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingridientPropType } from "../../utils/prop-types";

function BurgerComponents({ ingridients }) {
    return (
        <div className={`${styles.wrapper} pt-25 pl-10`}>
            <div className="pl-8">
                {ingridients.map((ingridient) => {
                    if (ingridient.type === "bun")
                        return (
                            <ConstructorElement
                                extraClass="mb-4"
                                key={ingridient._id}
                                type="top"
                                isLocked={true}
                                text={`${ingridient.name} (верх)`}
                                price={ingridient.price}
                                thumbnail={ingridient["image_mobile"]}
                            />
                        );
                    return null;
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
                                    <ConstructorElement
                                        extraClass="ml-2"
                                        key={ingridient._id}
                                        isLocked={false}
                                        text={ingridient.name}
                                        price={ingridient.price}
                                        thumbnail={ingridient["image_mobile"]}
                                    />
                                </li>
                            );
                        return null;
                    })}
                </ul>
            </div>
            <div className="pl-8 pt-4">
                {ingridients.map((ingridient) => {
                    if (ingridient.type === "bun")
                        return (
                            <ConstructorElement
                                key={ingridient._id}
                                type="bottom"
                                isLocked={true}
                                text={`${ingridient.name} (низ)`}
                                price={ingridient.price}
                                thumbnail={ingridient["image_mobile"]}
                            />
                        );
                    return null;
                })}
            </div>
            <div className={`${styles.orderContainer} pt-10`}>
                <span className="text text_type_digits-medium pr-2">610</span>
                <div className={`${styles.orderIconContainer} mr-10`}>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    extraClass="mr-4"
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerComponents.propTypes = {
    ingridients: PropTypes.arrayOf(ingridientPropType).isRequired,
};

export default BurgerComponents;
