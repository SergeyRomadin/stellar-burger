import styles from "./BurgerIngredients.module.css";
import { Tabs } from "../Tabs/Tabs";
import { UIEvent, memo, useCallback, useMemo, useRef, useState } from "react";
import IngredientItem from "../IngredientItem/IngredientItem";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import { burgerComponentsSelector } from "../../services/rtk/burgerComponentsSlice/burgerComponentsSlice";
import { useNavigate } from "react-router-dom";
import {
    IIngidient,
    IngridientType,
} from "../../services/rtk/rtkQuerry/stellarApiTypes";
import { HandleModalOpenFn } from "../../utils/types";
import { useAppSelector } from "../../services/rtk/store";

type Props = { handleModalOpen: HandleModalOpenFn };

function BurgerIngredients({ handleModalOpen }: Props) {
    const [current, setCurrent] = useState("Булки");
    const burgerComponents = useAppSelector(burgerComponentsSelector);
    const navigate = useNavigate();

    const { data: ingredients } = stellarApi.useGetIngredientsQuery("");

    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const mainsRef = useRef<HTMLHeadingElement>(null);

    const buns = useMemo(
        () => ingredients?.filter((item) => item.type === "bun") ?? [],
        [ingredients]
    );
    const mains = useMemo(
        () => ingredients?.filter((item) => item.type === "main") ?? [],
        [ingredients]
    );
    const sauces = useMemo(
        () => ingredients?.filter((item) => item.type === "sauce") ?? [],
        [ingredients]
    );

    const count = (item_Id: string, itemType: IngridientType) => {
        let count = burgerComponents.filter(
            (item) => item._id === item_Id
        ).length;
        if (itemType === "bun") count *= 2;
        return count;
    };

    const renderItems = (items: IIngidient[], handleClick: () => void) =>
        items?.map((item, i) => {
            return (
                <IngredientItem
                    count={count(item?._id, item?.type) || null}
                    key={item.id}
                    item={item}
                    onClick={() => {
                        handleClick();

                        navigate(`/ingridients/${item._id}`, {
                            state: { root: true },
                        });
                    }}
                />
            );
        });

    const scrollTo = useCallback((tab) => {
        switch (tab) {
            case "Булки":
                bunsRef?.current?.scrollIntoView();
                break;
            case "Соусы":
                saucesRef?.current?.scrollIntoView();
                break;
            case "Начинки":
                mainsRef?.current?.scrollIntoView();
                break;
            default:
                throw new Error(`Ошибка скролла: ${tab}`);
        }
    }, []);

    const handlerScroll = (e: UIEvent<HTMLDivElement>) => {
        [bunsRef, saucesRef, mainsRef].forEach((section) => {
            const sectionTop = section.current?.offsetTop ?? 0;
            if ((e.target as HTMLElement).scrollTop >= sectionTop - 324) {
                setCurrent(section.current?.textContent ?? "");
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
            <Tabs current={current} setCurrent={scrollTo} />

            <div
                onScroll={handlerScroll}
                className={`custom-scroll mt-10 ${styles.ingredientsContainer}`}
            >
                <h2 ref={bunsRef} className="text text_type_main-medium">
                    Булки
                </h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {renderItems(buns, handleModalOpen)}
                </ul>
                <h2
                    ref={saucesRef}
                    className="text text_type_main-medium pt-10"
                >
                    Соусы
                </h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {renderItems(sauces, handleModalOpen)}
                </ul>
                <h2 ref={mainsRef} className="text text_type_main-medium pt-10">
                    Начинки
                </h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {renderItems(mains, handleModalOpen)}
                </ul>
            </div>
        </div>
    );
}

export default memo(BurgerIngredients);