import { createContext, useContext, useState, useEffect, useReducer } from "react";
import reducer from "./reducer"
import * as actions from "./actions"
import * as api from "../api";

const context = createContext();

const initialUserState = {
    username: null,
    email: null,
    date: null
}

export const Provider =({ children }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, dispatch] = useReducer(useReducer, initialUserState)

    const setUser = async (token) => {
        setLoading(true)

        if (token) {
            window.localStorage.setItem("token", token);
            const res = await api.getUser();
            dispatch(actions.setUserData(res.data));
            setError(!res.verified)
        } else {
            window.localStorage.clear()
            dispatch(actions.setUserData(initialUserState))
        }
        setLoading(false)
    }

    const updateUser = async (data) => {
        setLoading(true);
        const res = await api.updateUser(data);
        setError(!res.success);
        dispatch(actions.setUserData(res.data));
        setLoading(false);
      };



    // useEffect(() => {
    //     const token = window.localStorage.getItem("token");
    //     setUser(token);
    //   }, []);

    return (
        <context.Provider value={{loading, error, user, setUser }}>
            {children}
        </context.Provider>
    )

}

export const useUserContext = () => useContext(context)
