import { MouseEvent, ReactNode, memo, useRef } from "react";

import Styles from "./Modal.module.css";

const ModalOverlay = ({
    onClose,
    children,
}: {
    onClose: () => void;
    children: ReactNode;
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
