import React, {
    MouseEvent,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import PropTypes from "prop-types";
import Portal, { createContainer } from "../Portal/Portal";

import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const MODAL_CONTAINER_ID = "modal-container-id";

const ModalOverlay = ({
    onClose,
    children,
}: {
    onClose: () => void;
    children: Element;
}) => {
    const rootRef = useRef(null);
    const closeModal = (event: MouseEvent<HTMLDivElement>) => {
        if (
            // event &&
            event?.target instanceof Node &&
            rootRef.current === event?.target
        ) {
            onClose();
        }
    };
    return (
        <div
            ref={rootRef}
            className={Styles.wrap}
            onClick={closeModal}
            data-testid="wrap"
        >
            {children}
        </div>
    );
};

export default memo(ModalOverlay);
