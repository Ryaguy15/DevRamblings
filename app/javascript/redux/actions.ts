import { ADD_TOKEN, REMOVE_TOKEN } from './actionTypes';


export const addToken = (content:string) => ({
    type: ADD_TOKEN,
    payload: { token: content }
});

export const removeToken = () => ({
    type: REMOVE_TOKEN
});