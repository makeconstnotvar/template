const dropStyles = (metaState: any = {}) => ({
  option: (provided, state) => {
    return provided;
  },
  control: provided => ({
    ...provided,
    ...(metaState.isError ? {borderColor: `#b00f1c`} : {}),
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? `#bdbdbd` : `#e6e6e6`,
  }),
  placeholder: (provided, state) => {
    let color = state.isDisabled ? `#2c3e50` : provided.color;

    if (metaState.isError) {
      color = `#b00f1c`;
    }

    return {color};
  }
});

export {dropStyles};
