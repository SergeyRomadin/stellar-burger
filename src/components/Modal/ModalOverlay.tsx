import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
    return (
        <div className={Styles.wrap} onClick={onClose} data-testid="wrap">
            {children}
        </div>
    );
};

export default memo(ModalOverlay);
