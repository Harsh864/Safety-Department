import { FIND_PDF, SEARCH_QUERY } from "./ActionType"

const initialState = {

    query: null

}

export const userReducer = (store = initialState, { type, payload }) => {
    if (type === SEARCH_QUERY) {
        return { ...store, query: payload }
    }

    return store;
}

