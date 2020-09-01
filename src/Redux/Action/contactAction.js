import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';
import {
    CONTACT_START,
    CONTACT_SUCCESS,
    CONTACT_FAILED,
    ADD_CONTACT,
} from '../Types';

export const getContacts = () => {
    return async dispatch => {
        dispatch({
            type: CONTACT_START,
        });
        try {
            let response = await Axios.get(`${API_URL}/contact`);
            dispatch({
                type: CONTACT_SUCCESS,
                payload: response.data.data,
            });
        } catch {
            dispatch({
                type: CONTACT_FAILED,
            });
        }
    };
};

export const getContactsById = (id) => {
    return async dispatch => {
        dispatch({
            type: CONTACT_START,
        });
        try {
            let response = await Axios.get(`${API_URL}/contact/${id}`);
            dispatch({
                type: CONTACT_SUCCESS,
                payload: response.data.data,
            });
        } catch {
            dispatch({
                type: CONTACT_FAILED,
            });
        }
    };
};

export const addContact = (form) => {
    return async dispatch => {
        dispatch({
            type: CONTACT_START,
        });
        try {
            let response = await Axios.post(`${API_URL}/contact`, form);
            dispatch({
                type: ADD_CONTACT,
                payload: response.data.data,
            });
        } catch {
            dispatch({
                type: CONTACT_FAILED,
            });
        }
    };
};

export const editContact = (id, form) => {
    return async dispatch => {
        dispatch({
            type: CONTACT_START,
        });
        try {
            let response = await Axios.put(`${API_URL}/contact/${id}`, form);
            dispatch({
                type: CONTACT_SUCCESS,
                payload: response.data.data,
            });
        } catch {
            dispatch({
                type: CONTACT_FAILED,
            });
        }
    };
};

export const deleteContact = (id) => {
    return async dispatch => {
        dispatch({
            type: CONTACT_START,
        });
        try {
            let headers = {
                headers : {
                    Accept: 'Application/json',
                },
            };
            await Axios.delete(`${API_URL}/contact/${id}`, headers);
            dispatch({
                type: CONTACT_SUCCESS,
            });
        } catch {
            dispatch({
                type: CONTACT_FAILED,
            });
        }
    };
};
