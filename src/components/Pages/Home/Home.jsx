import { Outlet } from "react-router-dom";
import BurgerIngredients from "../../BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../../BurgerComponents/BurgerComponents";
import PropTypes from "prop-types";

const Home = ({ handleModalOpen }) => {
    return (
        <>
            <Outlet />
            <BurgerIngredients handleModalOpen={handleModalOpen} />
            <BurgerComponents handleModalOpen={handleModalOpen} />
        </>
    );
};

Home.prototype = {
    handleModalOpen: PropTypes.func,
};

export { Home };
