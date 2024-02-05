import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
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
import { OredersList } from "../OrdersList/OrdersList";
import { websocketApi } from "../../services/rtk/rtkQuerry/websocketApi";
import { OrderInfo } from "../OrderInfo/OrderInfo";

function App() {
    const navigate = useNavigate();
    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();
    const { data: userOrders } = websocketApi.useGetOrdersFeedQuery();

    const handleModalOpen = useCallback((content) => {
        if (content) setModalContent(content);
        setModalActive(true);
    }, []);
    const handleModalClose = useCallback(() => {
        navigate(-1);
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
                        <Route
                            path="/profile/orders/:id"
                            element={
                                <div className={styles.wrapper}>
                                    <OrderInfo />
                                </div>
                            }
                        />
                        <Route
                            path="/feed/:id"
                            element={
                                <div className={styles.wrapper}>
                                    <OrderInfo />
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
                            element={
                                <ul>
                                    <OredersList
                                        orders={userOrders?.orders}
                                        openModal={handleModalOpen}
                                    />
                                    <Outlet />
                                </ul>
                            }
                        >
                            {isModalActive && (
                                <Route
                                    path=":id"
                                    element={
                                        <Modal
                                            title="some modal title"
                                            onClose={handleModalClose}
                                        >
                                            <OrderInfo />
                                        </Modal>
                                    }
                                />
                            )}
                        </Route>
                    </Route>
                    <Route
                        path="/feed"
                        element={<Feed openModal={handleModalOpen} />}
                    >
                        {isModalActive && (
                            <Route
                                path=":id"
                                element={
                                    <Modal
                                        title="some modal title"
                                        onClose={handleModalClose}
                                    >
                                        <OrderInfo />
                                    </Modal>
                                }
                            />
                        )}
                    </Route>
                </Routes>
            </DndProvider>
        </Layout>
    );
}

export default App;
