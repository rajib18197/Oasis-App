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
  }
}
