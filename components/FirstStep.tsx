import React, { useCallback, useState, useEffect, useContext } from "react";
import { MultiStepContext } from "../context/MultiStepContext";
import { useFirstStep } from "../hooks/useFirstStep";
type Props = {};

type StepInputProps = {
  type: string;
  name: string;
  onChange: (str: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (name: string) => void;
  onFocus?: (name: string) => void;
  defaultValue?: string;
  error?: string;
  value: string;
  checked?: boolean;
};

function StepInput({
  type,
  name,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  error,
  value,
}: StepInputProps) {
  /*TO MAKE AN API CALL WE USE THE 
    fetch()
    */

  return (
    <div className="contactform flex flex-col gap-2">
      <span className="uppercase font-bold">{name}</span>
      <input
        className="w-full px-2 py-1 border border-gray-300 rounded-lg"
        type={type}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={() => {
          if (onBlur) {
            onBlur(name);
          }
        }}
        onFocus={() => {
          if (onFocus) {
            onFocus(name);
          }
        }}
      />
      <div className="text-red-500">{error}</div>
    </div>
  );
}

function RadioInput({
  type,
  name,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  error,
  value,
  checked,
}: StepInputProps) {
  /*TO MAKE AN API CALL WE USE THE 
   fetch()
   */

  return (
    <div className="inputradio flex flex-col gap-2">
      <input
        className="w-full px-2 py-1 border border-gray-300 rounded-lg"
        type={type}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={() => {
          if (onBlur) {
            onBlur(name);
          }
        }}
        onFocus={() => {
          if (onFocus) {
            onFocus(name);
          }
        }}
        checked={checked}
      />
      <div className="text-red-500">{error}</div>
    </div>
  );
}

function FirstStep({}: Props) {
  const { setExternalError, fieldErrors, addData, data } = useContext(MultiStepContext);
  const {
    handleInputBlur,
    handleInputChange,
    handleInputFocus
  } = useFirstStep({
    addData,
    fieldErrors,
    data,
    setExternalError
  })
  
  

  return (
    <div className="mt-10 w-full bg-white justify-center">
      <StepInput
        type="text"
        name="name"
        onChange={handleInputChange}
        error={fieldErrors.name}
        value={data.name}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <StepInput
        type="text"
        name="surname1"
        onChange={handleInputChange}
        error={fieldErrors.surname1}
        value={data.surname1}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <StepInput
        type="text"
        name="surname2"
        onChange={handleInputChange}
        value={data.surname2}
        error={fieldErrors.surname2}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <StepInput
        type="date"
        name="birthdate"
        onChange={handleInputChange}
        error={fieldErrors.birthdate}
        value={data.birthdate}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <StepInput
        type="number"
        name="mobile"
        onChange={handleInputChange}
        error={fieldErrors.mobile}
        value={data.mobile}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <StepInput
        type="email"
        name="email"
        onChange={handleInputChange}
        error={fieldErrors.email}
        value={data.email}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <span className="uppercase font-bold">gender</span>
      <RadioInput
        checked={data.gender === "Male" || !data.gender}
        type={"radio"}
        onChange={handleInputChange}
        name="gender"
        value={"Male"}
      /><span>Male</span>

      
      <RadioInput
        checked={data.gender === "Female"}
        type={"radio"}
        onChange={handleInputChange}
        name="gender"
        value={"Female"}
      /><span>Female</span>
      <RadioInput
        checked={data.gender === "NonBinary"}
        type={"radio"}
        onChange={handleInputChange}
        name="gender"
        value={"NonBinary"}
      /><span>Non Binary</span>
    </div>
  );
}

export default FirstStep;
