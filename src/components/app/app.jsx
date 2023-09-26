import styles from "./app.module.css";
import { getIngridients } from "../../services/api";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerComponents from "../BurgerComponents/BurgerComponents";
import { useCallback, useEffect, useReducer, useState } from "react";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { initIngredients } from "../../services/rtk/igredientsSlice/ingredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();

    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();

    useEffect(() => {
        getIngridients().then((data) => {
            dispatch(
                initIngredients(
                    data.data.map((el) => {
                        el.count = 0;
                        return el;
                    })
                )
            );
        });
        // eslint-disable-next-line
    }, []);

    const handleModalOpen = useCallback((content) => {
        setModalContent(content);
        setModalActive(true);
    }, []);
    const handleModalClose = useCallback(() => {
        setModalActive(false);
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className="content-wrapper">
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngridients handleModalOpen={handleModalOpen} />
                    <BurgerComponents handleModalOpen={handleModalOpen} />
                    {isModalActive && (
                        <Modal
                            title="some modal title"
                            onClose={handleModalClose}
                        >
                            {modalContent}
                        </Modal>
                    )}
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
