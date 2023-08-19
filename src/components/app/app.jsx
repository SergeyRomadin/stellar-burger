import styles from "./app.module.css";
import { getIngridients } from "../../services/api";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerComponents from "../BurgerComponents/BurgerComponents";
import { useCallback, useEffect, useReducer, useState } from "react";
import Modal from "../Modal/Modal";
import { IngridientsContext } from "../../services/context/ingridientsContext";

const ingridientsReducer = (state, { type, payload }) => {
    switch (type) {
        case "INIT_INGRIDIENTS":
            return payload;
        case "ADD":
            return state.map((item) => {
                if (payload.type === "bun") {
                    if (item !== payload && item.type === "bun")
                        return { ...item, count: 0 };
                }
                return item === payload
                    ? { ...item, count: item.count + 1 }
                    : item;
            });
        case "REMOVE":
            return state.map((item) => {
                return item === payload
                    ? { ...item, count: item.count - 1 }
                    : item;
            });
        default:
            throw new Error(`Wrong type of action: ${type}`);
    }
};

function App() {
    const ingridients = useReducer(ingridientsReducer, []);
    // eslint-disable-next-line
    const [ingridientsState, dispatchIngridients] = ingridients;

    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();

    useEffect(() => {
        getIngridients().then((data) => {
            dispatchIngridients({
                type: "INIT_INGRIDIENTS",
                payload: data.data.map((el) => {
                    el.count = 0;
                    return el;
                }),
            });
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
                <IngridientsContext.Provider value={ingridients}>
                    <BurgerIngridients handleModalOpen={handleModalOpen} />
                    <BurgerComponents handleModalOpen={handleModalOpen} />
                </IngridientsContext.Provider>
                {isModalActive && (
                    <Modal title="some modal title" onClose={handleModalClose}>
                        {modalContent}
                    </Modal>
                )}
            </main>
        </div>
    );
}

export default App;
