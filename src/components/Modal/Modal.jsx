import React, { useCallback, useEffect, useRef, useState } from "react";

import Portal, { createContainer } from "../Portal/Portal";

import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const MODAL_CONTAINER_ID = "modal-container-id";

const Modal = (props) => {
    const { onClose, children } = props;

    const rootRef = useRef(null);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleWrapperClick = (event) => {
            const { target } = event;

            if (target instanceof Node && rootRef.current === target) {
                onClose?.();
            }
        };
        const handleEscapePress = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("click", handleWrapperClick);
        window.addEventListener("keydown", handleEscapePress);

        return () => {
            window.removeEventListener("click", handleWrapperClick);
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, [onClose]);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
            <div className={Styles.wrap} ref={rootRef} data-testid="wrap">
                <div className={`${Styles.content} pr-10 pl-10`}>
                    <button
                        type="button"
                        className={`${Styles.closeButton}`}
                        onClick={handleClose}
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

export default Modal;

// type Props = {
//   title: string,
//   onClose?: () => void,
//   children: React.ReactNode | React.ReactNode[],
// };
