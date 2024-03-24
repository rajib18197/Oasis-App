export const initialState = {};

function validateInput(state, inputName, value) {
  const error = {};

  const field = state[inputName];

  if (field.required && (!field.pattern || !field.validate)) {
    const isInValid = field.value === "";
    if (isInValid) error[inputName] = field.required;
  }

  if (field.pattern) {
    const isInValid = !field.pattern.value.test(value);
    if (isInValid) error[inputName] = field.pattern.message;
  }

  if (field.validate) {
    const validity = field.validate(value, state);
    const isInValid = typeof validity === "string";
    if (isInValid) error[inputName] = validity;
  }

  return error;
}

export function registrationReducer(state, action) {
  switch (action.type) {
    case "ADD_INPUT": {
      return {
        ...state,
        [action.payload.field]: action.payload.info,
      };
    }

    case "CHANGE_VALUE": {
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          value: action.payload.value,
        },
      };
    }

    case "VALIDATE_FIELD": {
      const { name, value } = action.payload;

      const errorMsg = validateInput(state, name, value);

      if (errorMsg[name]) {
        return {
          ...state,
          [name]: {
            ...state[name],
            error: errorMsg[name],
          },
        };
      }

      return { ...state, [name]: { ...state[name], error: null } };
    }

    case "RESET_ERROR": {
      return {
        ...state,
        [action.payload]: { ...state[action.payload], error: null },
      };
    }

    case "RESET_ALL_INPUTS": {
      const nextState = {};
      // for resetting
      const keys = Object.keys(state);

      for (let key of keys) {
        nextState[key] = { ...state[key], value: "", error: null };
      }

      console.log(nextState);
      return nextState;
    }
  }
}
