import "./BasicInput.css";
import React, { useState, useEffect } from "react";

export default function InputText({
  inputText,
  error,
  handleInput,
  labelText,
  placeholderText,
  inputType,
}) {
  return (
    <>
      <label className="basicInputLabel">{labelText}</label>
      <input
        className={`basicInput ${error ? "basicInputError" : ""}`}
        type={inputType}
        placeholder={placeholderText}
        onChange={(e) => handleInput(e.target.value)}
        value={inputText}
      />
    </>
  );
}
