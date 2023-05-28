import React, { useState, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SUBMIT_PROMPT_BEGIN,
  SUBMIT_PROMPT_SUCCESS,
  SUBMIT_PROMPT_ERROR,
} from "./actions";

import reducer from "./reducer";

let token = null;
let user = null;

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  chatResponse: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // async storage functions
  const getUserFromLocalStorage = async () => {
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
      console.log(`The user token is: ${token}`);
    } catch (error) {
      console.log("Failed to get user or token");
    }
  };

  const addUserToLocalStorage = async ({ user, token }) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      getUserFromLocalStorage();
      console.log("Set user or token success");
    } catch (error) {
      console.log("Failed to set user or token");
    }
  };

  const removeUserFromLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log("Failed to remove user or token");
    }
  };

  // app context functions
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    await axios
      .post("http://10.0.0.33:4040/api/v1/auth/register", currentUser)
      .then((response) => {
        const { user, token } = response.data;
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: { user, token },
        });
        // add user to local storage
        addUserToLocalStorage({ user, token });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            msg: error.response.data.msg,
          },
        });
      });
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.0.33:4040/api/v1/auth/login",
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: err.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const submitPrompt = async (chatPrompt) => {
    dispatch({ type: SUBMIT_PROMPT_BEGIN });
    try {
      const response = await axios.post(
        "http://10.0.0.33:4040/api/v1/chatGPT/chatCompletion",
        chatPrompt
      );
      const { chatResponse } = response.data;
      dispatch({ type: SUBMIT_PROMPT_SUCCESS, payload: { chatResponse } });
    } catch (error) {
      dispatch({
        type: SUBMIT_PROMPT_ERROR,
        payload: {
          msg: err.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        submitPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
