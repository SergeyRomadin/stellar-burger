import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../BurgerComponents/BurgerComponents";
import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

function App() {
    // const dispatch = useDispatch();

    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();

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
                    <BurgerIngredients handleModalOpen={handleModalOpen} />
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
