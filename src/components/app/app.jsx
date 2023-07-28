import styles from "./app.module.css";
import { getIngridients } from "../../services/api";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngridients/BurgerIngridients";
import BurgerComponents from "../BurgerComponents/BurgerComponents";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

function App() {
    const [selectedIngridients, setSelectedIngridients] = useState([
        {
            _id: "60666c42cc7b410027a1a9b1",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b5",
            name: "Говяжий метеорит (отбивная)",
            type: "main",
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: "https://code.s3.yandex.net/react/code/meat-04.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-04-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b6",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b6",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b7",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b4",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0,
        },
        {
            _id: "60666c42cc7b410027a1a9b9",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
        },
    ]);
    const [ingridients, setIngridients] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState();

    useEffect(() => {
        getIngridients().then((data) => {
            setIngridients(data.data);
        });
    }, []);

    const handleModalOpen = (content) => {
        setModalContent(content);
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className="content-wrapper">
                <BurgerIngridients
                    handleModalOpen={handleModalOpen}
                    ingridients={ingridients}
                />
                <BurgerComponents
                    ingridients={selectedIngridients}
                    handleModalOpen={handleModalOpen}
                />
                {isModalActive && (
                    <Modal title="some modal title" onClose={handleModalClose}>
                        {modalContent}
                    </Modal>
                )}
            </main>
        </div>
    );
}

export default App;
