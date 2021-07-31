import React, { useState , useEffect } from 'react'
import CardImages from './CardImages';
import Inputs from './Inputs';
import Styles from './index.module.scss';


export function Insert_gift({ apiGiftInsert, reducerCategories, reducerSubcategories , change_gift_category_method}) {
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

    useEffect(() => {
        change_gift_category_method(state.gift_category)
    }, [state.gift_category])// eslint-disable-line react-hooks/exhaustive-deps


    const handelSubmit = () => {
        let res = {
            ...state,
            is_physical: state.is_physical === true ? "FALSE" : "TRUE"
        }
        // console.log("res" , res);
        apiGiftInsert(res)
    }

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
