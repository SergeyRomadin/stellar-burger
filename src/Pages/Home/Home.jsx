import { Outlet } from "react-router-dom";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../../components/BurgerComponents/BurgerComponents";
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
