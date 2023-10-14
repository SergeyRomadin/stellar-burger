import doneImg from "../../img/done.png";
import styles from "./OrderDetails.module.css";
import PropTypes from "prop-types";

function OrderDetails({ orderNum }) {
    return (
        <section className={styles.wrapper}>
            <p className={`${styles.digits} text text_type_digits-large pt-30`}>
                {orderNum}
            </p>
            <p className="text text_type_main-default pt-8">
                идентификатор заказа
            </p>
            <img src={doneImg} alt="done" className="pt-15" />
            <p className="text text_type_main-small pt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive pt-2 pb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    );
}

OrderDetails.propTypes = {
    orderNum: PropTypes.number,
};

export default OrderDetails;
