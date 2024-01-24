import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerComponents from "../BurgerComponents/BurgerComponents";
import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/Register/SignIn";
import Register from "../Pages/Register/Register";
import ForgotPassword from "../Pages/Register/ForgotPassword";
import ResetPassword from "../Pages/Register/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import Feed from "../Pages/Feed/Feed";
import { Layout } from "./Layout";
import { ProtectedRouteElement } from "./ProtectedRouteElement";

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
        <Router>
            <Layout>
                <DndProvider backend={HTML5Backend}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <BurgerIngredients
                                        handleModalOpen={handleModalOpen}
                                    />
                                    <BurgerComponents
                                        handleModalOpen={handleModalOpen}
                                    />
                                    {isModalActive && (
                                        <Modal
                                            title="some modal title"
                                            onClose={handleModalClose}
                                        >
                                            {modalContent}
                                        </Modal>
                                    )}
                                </>
                            }
                        />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRouteElement element={<Profile />} />
                            }
                        />
                        <Route path="/feed" element={<Feed />} />
                    </Routes>
                </DndProvider>
            </Layout>
        </Router>
    );
}

export default App;
