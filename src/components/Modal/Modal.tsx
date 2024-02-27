import { memo, useEffect, useState } from "react";
import Portal, { createContainer } from "../Portal/Portal";

import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";

const MODAL_CONTAINER_ID = "modal-container-id";

type Props = {
    onClose: () => void;
    children: JSX.Element;
};

const Modal = ({ onClose, children }: Props) => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };
        window.addEventListener("keydown", handleEscapePress);

        return () => {
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, [onClose]);

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
            <ModalOverlay onClose={onClose}>
                <div className={`${Styles.content} pr-10 pl-10`}>
                    <button
                        type="button"
                        className={`${Styles.closeButton}`}
                        onClick={onClose}
                        data-testid="modal-close-button"
                    >
                        <CloseIcon type="primary" />
                    </button>

                    {children}
                </div>
            </ModalOverlay>
        </Portal>
    ) : null;
};

export default memo(Modal);
