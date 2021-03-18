import axios from "axios";
import {getCurrencyListURL, storeDataToServerURL} from "./apiEndPointHandler";


// export function login (data) {
//     return axios.post(`${BASE_URL}/login`, { email: data.email, password: data.password })
//         .then(response => {
//             console.log(response)
//             localStorage.setItem('access-token', response.data.token);
//             // localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
//             //  localStorage.setItem('role', response.data.role);
//             localStorage.setItem('user_id', response.data.id);
//             //  localStorage.setItem('user_name', response.data.user);
//
//             return response.data;
//         })
//         .catch(err => Promise.reject('Authentication Failed!'));
// }

export const getCurrencyList = () => {
    return axios.get(`${getCurrencyListURL}`)
        .then((res) => {

            let currencyNamesGlobal = [];

            let object1 = res.data.currencies;

            for (const [key, value] of Object.entries(object1)) {
                currencyNamesGlobal.push(
                    {"name": `${key} - ${value}`, "unit": `${key}`}
                );
            };

            return currencyNamesGlobal;



        });
};

export const convertCurrency = (amount, from, destinationCurrency) => {

    return axios.get(`https://free.currconv.com/api/v7/convert?q=${from.unit}_${destinationCurrency.unit}&compact=ultra&apiKey=2c47ef9027a093d41e2e`)
        .then((res) => {

            let objt = `${from.unit}_${destinationCurrency.unit}`;

            let total = res.data[objt] * amount;

            return total.toFixed(2);

        });
};

export const storeDataToServer = (amount, from, destinationCurrency, convertedValue, converted_to_usd) => {

    return axios.post(`${storeDataToServerURL}`, { amount : amount, from : from.unit, to : destinationCurrency.unit, converted: convertedValue, converted_to_usd: converted_to_usd })
        .then((res) => {

            console.log(res);

        });
};

export const timer = (ms) => new Promise(res => setTimeout(res, ms))






