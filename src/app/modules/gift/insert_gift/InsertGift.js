import React, { useState, useEffect } from 'react'
import CardImages from './CardImages';
import Inputs from './Inputs';
import Styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { gift_insert_dispatch } from "../../../../redux/gift/gift_insert";
import { actionTypes as actionTypesCategory } from "./../../../../redux/gift/gift_category_select";
import { actionTypes as actionTypesSubCategory } from "./../../../../redux/gift/gift_subCategory_select";


export function Insert_gift() {
    const [state, setstate] = useState({
        title: "",
        name: "",
        gift_category: "",
        gift_sub_category: "",
        type: "NO_TYPE",
        required_bonus: "",
        remained_capacity: null,
        expiration_time: "",
        image: "",
        is_physical: false,
        description: "",
        detailed_description: "",
        is_active: null
    })

    const dispatch = useDispatch()

    ////////////////////////////////Categories////////////////////////////////////
    const reducerCategories = useSelector(
        (state) => state.gift_select_Reducer_categories.data
    );

    useEffect(() => {
        dispatch({ type: actionTypesCategory.giftSelectActiveCategorisAsync })
    }, [])

    useEffect(() => {
        state.gift_sub_category &&
        setstate((prev) => ({ ...prev, gift_sub_category: "" }));

        callApiSelectSubCategory()
    }, [state.gift_category])// eslint-disable-line react-hooks/exhaustive-deps
    //////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////subCategories////////////////////////////////////
    const reducerSubcategories = useSelector(
        (state) => state.gift_select_Reducer_categories.data
    );

    const callApiSelectSubCategory = () => {
        let isFilter = state.gift_category ? { gift_category: state.gift_category } : {};

        dispatch({ type: actionTypesSubCategory.giftSelectActiveSubCategoryAsync, payload: isFilter })
    };
    //////////////////////////////////////////////////////////////////////////////

    /////////////////////////////// api gift insert //////////////////////////////
    const apiGiftInsert = () => {
        let image = state.image.split(",")[1] ? state.image.split(",")[1] : "";

        let obj = {
            ...state,
            image,
            is_physical: state.is_physical === true ? "FALSE" : "TRUE"
        };
        gift_insert_dispatch(obj)
    };
    //////////////////////////////////////////////////////////////////////////////


    /////////////////////////////// handle submit //////////////////////////////
    const handelSubmit = () => {

        apiGiftInsert()
    }
    //////////////////////////////////////////////////////////////////////////////

    return (
        <div className={Styles['card']}>
            <div className={Styles['modal']}>
                <div className={Styles['cardImges']}>
                    <CardImages stateImages={state} SetStateImages={setstate} />
                </div>
                <div className={Styles['inputs']}>
                    <Inputs
                        reducerCategories={reducerCategories}
                        state={state} setstate={setstate}
                        reducerSubcategories={reducerSubcategories}
                    />
                </div>
            </div>
            <div className={Styles['btns']}>
                <button className={'btnsGreen'} onClick={() => handelSubmit()} >ذخیره </button>
                {/* <button className={'btnsRed'} onClick={() => setNewButton(false)} >انصراف </button> */}
            </div>
        </div>
    )
}
