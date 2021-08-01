import axios from "axios";
import {getRandomNumber} from '../../method/getRandomNumber'


const AxiosCustom = (_config, _data) => {

    let userLocal = localStorage.getItem('persist:auth') ? JSON.parse(localStorage.getItem('persist:auth')).user : null

    let { token, member_id } = userLocal ? JSON.parse(userLocal)
        : { token: "3cf61fab-b50a-410f-9d59-3357ee4706fe", member_id: "_0zehXYBdxxYGfkX5_wd" }

    let config = {
        // baseURL: "http://192.168.73.64:7001/GradDB/V1/",
        baseURL: `http://192.168.73.31:${getRandomNumber(7004,7040)}/GradDB/V1/`,
        // baseURL: "http://192.168.39.207:7001/GradDB/V1/",
        method: "POST",
        headers: { "content-type": "application/json"  ,"Access-Control-Allow-Origin": "*"},
        ..._config,
        data: {
            api_key: "d025488f-8ec6-4434-afbe-b6a5343815a7",
            token: token,
            member_id: member_id,
            ..._data
            // table: "",
            // method_type: "login",
            // data: {
            //     "user": "ERFAN",
            //     "pass": "ERF1234"
            // }
        }
    }

    return (
        axios(config)
    )

}



export default AxiosCustom;