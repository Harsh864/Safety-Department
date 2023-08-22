import { SEARCH_QUERY } from "./ActionType"

export const searchQuery = (query) => (dispatch) => {
    dispatch({type: SEARCH_QUERY, payload:query})
}