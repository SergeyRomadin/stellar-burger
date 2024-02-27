import AppHeader from "../AppHeader/AppHeader";
import styles from "./app.module.css";
type Props = {
    children: JSX.Element;
};
export const Layout = ({ children }: Props) => {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className="content-wrapper">{children}</main>
        </div>
    );
};
