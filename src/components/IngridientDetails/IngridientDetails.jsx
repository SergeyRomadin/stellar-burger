import styles from "./IngridientDetails.module.css";
import { ingridientPropType } from "../../utils/prop-types";

function IngridientDetails({ ingridient }) {
    return (
        <section className={styles.wrapper}>
            <div className={`${styles.title} pt-10`}>
                <h2 className={`text text_type_main-large`}>
                    Детали ингредиента
                </h2>
            </div>
            <img
                src={ingridient.image}
                alt={ingridient.name}
                className={`${styles.img}`}
            />
            <div>
                <h3 className="text text_type_main-medium pt-4 pl-15 pr-15">
                    {ingridient.name}
                </h3>
                <ul className={`${styles.nutrientsList} pl-15 pr-15`}>
                    <li className={`${styles.nutrient}`}>
                        <span className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingridient.calories}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingridient.proteins}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingridient.carbohydrates}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingridient.calories}
                        </span>
                    </li>
                </ul>
            </div>
        </section>
    );
}

IngridientDetails.propTypes = {
    ingridient: ingridientPropType.isRequired,
};

export default IngridientDetails;
