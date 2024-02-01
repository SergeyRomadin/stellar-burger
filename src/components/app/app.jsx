import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Pages/Register/SignIn";
import Register from "../Pages/Register/Register";
import ForgotPassword from "../Pages/Register/ForgotPassword";
import ResetPassword from "../Pages/Register/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import Feed from "../Pages/Feed/Feed";
import { Layout } from "./Layout";
import { ProtectedRouteElement } from "./ProtectedRouteElement";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Home } from "../Pages/Home/Home";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import styles from "./app.module.css";

function App() {
    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();
    const handleModalOpen = useCallback((content) => {
        if (content) setModalContent(content);
        setModalActive(true);
    }, []);
    const handleModalClose = useCallback(() => {
        setModalActive(false);
        setModalContent(null);
    }, []);

    return (
        <Layout>
            <DndProvider backend={HTML5Backend}>
                {isModalActive && modalContent && (
                    <Modal title="some modal title" onClose={handleModalClose}>
                        {modalContent}
                    </Modal>
                )}
                {!isModalActive && (
                    <Routes>
                        <Route
                            path="/ingridients/:id"
                            element={
                                <div className={styles.wrapper}>
                                    <IngredientDetails />
                                </div>
                            }
                        />
                    </Routes>
                )}
                <Routes>
                    <Route
                        path="/"
                        element={<Home handleModalOpen={handleModalOpen} />}
                    >
                        {isModalActive && (
                            <Route
                                path="/ingridients/:id"
                                element={
                                    <Modal
                                        title="some modal title"
                                        onClose={handleModalClose}
                                    >
                                        <IngredientDetails />
                                    </Modal>
                                }
                            />
                        )}
                    </Route>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRouteElement
                                fromAuth
                                element={<SignIn />}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRouteElement
                                fromAuth
                                element={<Register />}
                            />
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <ProtectedRouteElement
                                fromAuth
                                element={<ForgotPassword />}
                            />
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedRouteElement
                                fromAuth
                                element={<ResetPassword />}
                            />
                        }
                    />
                    <Route
                        element={
                            <ProtectedRouteElement element={<Profile />} />
                        }
                    >
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route
                            path="/profile/orders"
                            element={<p>Comming son...</p>}
                        />
                    </Route>
                    <Route path="/feed" element={<Feed />} />
                </Routes>
            </DndProvider>
        </Layout>
    );
}

export default App;
