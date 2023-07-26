import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngridientItem.module.css";

function OrderInfo({ item, count }) {
    return (
        <section>
            <div>
                <p className="text text_type_digits-large">1234567890</p>
                <p className="text text_type_main-default">
                    The quick brown fox jumps over the lazy dog.
                </p>
            </div>
        </section>
    );
}

export default IngridientItem;
