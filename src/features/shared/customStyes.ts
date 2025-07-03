import type { StylesConfig, GroupBase } from 'react-select';
import type { OptionType } from './types';

export const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#ced4da',
    fontSize: '1rem',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#e9ecef' : 'white',
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};