import { Outlet } from "react-router-dom";
import BurgerIngredients from "../../BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../../BurgerComponents/BurgerComponents";

export const Home = ({ handleModalOpen }) => {
    return (
        <>
            <Outlet />
            <BurgerIngredients handleModalOpen={handleModalOpen} />
            <BurgerComponents handleModalOpen={handleModalOpen} />
        </>
    );
};
