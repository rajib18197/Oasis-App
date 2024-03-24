import { useReducer } from "react";
import { initialState, registrationReducer } from "./registrationReducer";

export function useForm() {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const keys = Object.keys(state);

  const errors = {};

  for (let key of keys) {
    errors[key] = { message: state[key].error };
  }

  function register(inputName, config) {
    if (state[inputName])
      return {
        value: state[inputName].value,
        onChange: handleChange,
        onBlur: handleBlur,
      };

    dispatch({
      type: "ADD_INPUT",
      payload: {
        field: inputName,
        info: {
          value: "",
          error: null,
          ...config,
        },
      },
    });

    return { value: "", onChange: handleChange, onBlur: handleBlur };
  }

  function handleChange(e) {
    if (e.target.name === "confirmPassword") {
      dispatch({
        type: "VALIDATE_FIELD",
        payload: {
          name: e.target.name,
          value: e.target.value,
          password: password.value,
        },
      });
    } else {
      dispatch({ type: "RESET_ERROR", payload: e.target.name });
    }

    dispatch({
      type: "CHANGE_VALUE",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleBlur(e) {
    if (e.target.name === "confirmPassword") {
      dispatch({
        type: "VALIDATE_FIELD",
        payload: {
          name: e.target.name,
          value: e.target.value,
          password: password.value,
        },
      });
    } else {
      dispatch({
        type: "VALIDATE_FIELD",
        payload: { name: e.target.name, value: e.target.value },
      });
    }
  }

  function getValues() {
    return state;
  }

  function reset() {
    dispatch({ type: "RESET_ALL_INPUTS" });
  }

  return { formState: { state, errors }, getValues, register, reset };
}
