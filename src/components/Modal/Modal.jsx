import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Portal, { createContainer } from "../Portal/Portal";

import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const MODAL_CONTAINER_ID = "modal-container-id";

const Modal = ({ onClose, children }) => {
    const rootRef = useRef(null);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    const closeModal = () => {
        onClose?.();
    };

    useEffect(() => {
        const handleWrapperClick = (event) => {
            const { target } = event;

            if (target instanceof Node && rootRef.current === target) {
                closeModal();
            }
        };
        const handleEscapePress = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("click", handleWrapperClick);
        window.addEventListener("keydown", handleEscapePress);

        return () => {
            window.removeEventListener("click", handleWrapperClick);
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, [onClose]);

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
            <div className={Styles.wrap} ref={rootRef} data-testid="wrap">
                <div className={`${Styles.content} pr-10 pl-10`}>
                    <button
                        type="button"
                        className={`${Styles.closeButton}`}
                        onClick={closeModal}
                        data-testid="modal-close-button"
                    >
                        <CloseIcon type="primary" />
                    </button>

                    {children}
                </div>
            </div>
        </Portal>
    ) : null;
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};

export default memo(Modal);
