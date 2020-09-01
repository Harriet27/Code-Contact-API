import {
    CONTACT_START,
    CONTACT_SUCCESS,
    CONTACT_FAILED,
    ADD_CONTACT,
} from '../Types';

const INITIAL_STATE = {
    contactList : [],
    addedContact : [],
    loading : false,
};

export const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_START:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_SUCCESS:
            return {
                ...state,
                contactList: action.payload,
                loading: false,
            };
        case ADD_CONTACT:
            return {
                ...state,
                addedContact: action.payload,
            };
        case CONTACT_FAILED:
            return {
                ...state,
                loading: false,
            };
        default: return state;
    };
};
