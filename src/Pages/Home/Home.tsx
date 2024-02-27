import { Outlet } from "react-router-dom";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../../components/BurgerComponents/BurgerComponents";
import { HandleModalOpenFn } from "../../utils/types";

type Props = {
    handleModalOpen: HandleModalOpenFn;
};

const Home = ({ handleModalOpen }: Props) => {
    return (
        <>
            <Outlet />
            <BurgerIngredients handleModalOpen={handleModalOpen} />
            <BurgerComponents handleModalOpen={handleModalOpen} />
        </>
    );
};

export { Home };
