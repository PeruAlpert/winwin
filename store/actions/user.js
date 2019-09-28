import { EDIT_USER, FETCHING } from "../CONSTANTS";
import axios from "axios";
import server from "../../constants/server";

export const logIn = user => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING, value: true });
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      url: `${server.api_url}/Users/Login?user=${user.name}&pass=${user.pass}`
    })
      .then(responseJson => {
        // console.log(responseJson)
        dispatch({ type: EDIT_USER, value: responseJson.data });
      })
      .catch(error => {
        dispatch({ type: EDIT_USER, value: {} });
      });
  };
};
