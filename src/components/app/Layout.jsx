import AppHeader from "../AppHeader/AppHeader";
import styles from "./app.module.css";

export const Layout = ({ children }) => {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className="content-wrapper">{children}</main>
        </div>
    );
};
