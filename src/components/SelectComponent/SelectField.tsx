'use client'

import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'

interface PropsType {
  name: string
  placeholder: string
  options: Array<{ value: string; label: string }>
  [key: string]: any
}

export const customStyles = ({ backgroundColor }: any): any => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: backgroundColor ?? '#FFF',
    color: '#6e6f72',
    fontSize: '14px',
    paddingLeft: '0px',
    // marginLeft: '-10px',
    boxShadow: 'none',
    cursor: 'pointer',
    width: '100%',
    height: '52px',
    borderRadius: '8px',
    border: '1px solid #D1D1D1',
    outline: 'none',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    cursor: 'pointer',
    color: '#B7B7B7',
    fontWeight: 400,
    fontSize: '16px',
  }),
  // option: (provided: any, state: any) => ({
  //   ...provided,
  //   cursor: 'pointer',
  //   backgroundColor: !state.isFocused ? 'white' : '#126106',
  //   color: state.isFocused ? 'white' : '#126106',
  // }),
  option: (provided: any, state: any) => {
    const isDisabled = state.isDisabled

    return {
      ...provided,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: !state.isFocused ? 'white' : '#126106',
      color: state.isFocused ? 'white' : isDisabled ? 'darkred' : '#126106',
    }
  },
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 40,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    cursor: 'pointer',
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: '200px',
  }),
})

const SelectField = ({ name, placeholder, options, ...props }: PropsType) => {
  const {
    control,
    setValue,
    value,
    disabled,
    backgroundColor,
    isOptionDisabled,
    hasStateHandler,
    isClearable,
    isMulti,
  } = props
  return (
    // <Controller
    //     name={name}
    //     control={control}
    //     render={({ field }: any) => (
    <Select
      options={options}
      components={{
        IndicatorSeparator: null,
      }}
      value={value}
      className={'p-0 m-0  w-full  text-[12px] bg-[#FFF]  rounded-[10px] '}
      placeholder={placeholder}
      onChange={(value: any) => {
        if (hasStateHandler) {
          props.setState((prev: any) => ({ ...prev, [name]: value?.value }))
        } else {
          setValue(name, value?.value, { shouldValidate: true })
        }
      }}
      isClearable={isClearable ?? true}
      isSearchable={true}
      styles={customStyles({ backgroundColor })}
      isDisabled={disabled}
      isOptionDisabled={isOptionDisabled}
      menuPosition="fixed"
    />
    //     )}
    // />
  )
}

export default SelectField
