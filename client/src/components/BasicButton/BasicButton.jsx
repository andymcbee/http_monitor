import "./BasicButton.css";
import React, { useState, useEffect } from "react";

export default function BasicButton({ handleClick, buttonText }) {
  return (
    <>
      <button
        className="basicButton"
        type="submit"
        onClick={() => handleClick()}
      >
        {buttonText}
      </button>
    </>
  );
}
