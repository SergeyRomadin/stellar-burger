import styles from "./IngredientDetails.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { burgerComponentsSelector } from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

function IngredientDetails() {
    const { data: ingredients, isFetching } =
        stellarApi.useGetIngredientsQuery("");
    const { id } = useParams();

    const ingredient = ingredients?.find((el) => {
        return el?._id === id;
    });
    if (isFetching || !ingredients) return <p>loading</p>;

    return (
        <section className={styles.wrapper}>
            <div className={`${styles.title} pt-10`}>
                <h2 className={`text text_type_main-large`}>
                    Детали ингредиента
                </h2>
            </div>
            <img
                src={ingredient.image_large}
                alt={ingredient.name}
                className={`${styles.img}`}
            />
            <div>
                <h3 className="text text_type_main-medium pt-4 pl-15 pr-15">
                    {ingredient.name}
                </h3>
                <ul className={`${styles.nutrientsList} pl-15 pr-15`}>
                    <li className={`${styles.nutrient}`}>
                        <span className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingredient.calories}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingredient.proteins}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingredient.carbohydrates}
                        </span>
                    </li>
                    <li className={styles.nutrient}>
                        <span className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </span>
                        <span className="text text_type_digits-default text_color_inactive pt-2">
                            {ingredient.calories}
                        </span>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default IngredientDetails;
