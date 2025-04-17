
export const customSeletcStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '44px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3182ce',
    },
    borderColor: state.isFocused ? '#3182ce' : '#e2e8f0',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '12px 16px',
    backgroundColor: state.isSelected 
      ? '#3182ce' 
      : state.isFocused 
        ? '#222' 
        : '#222',
    color: 'white',
    '&:active': {
      backgroundColor: '#bee3f8',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#718096',
    '&:hover': {
      color: '#3182ce',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#718096',
    '&:hover': {
      color: '#e53e3e',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#e2e8f0',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#a0aec0',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1a202c',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#ebf8ff',
    borderRadius: '4px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#3182ce',
    padding: '4px 8px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#3182ce',
    ':hover': {
      backgroundColor: '#3182ce',
      color: 'white',
    },
  }),
};
