/**
 * Author: Ziratsu/Slider-React
 */
import React from "react";
import leftArrow from "/static/icons/left-arrow.svg";
import rightArrow from "/static/icons/right-arrow.svg";
import {IconButton, Icon} from '@material-ui/core';

export default function BtnSlider({ direction, moveSlide }) {
  //console.log(direction, moveSlide);
  function renderArrow() {
      //console.log(direction === "next" ? <rightArrow/> : <leftArrow/>);
      return(direction === "next" ? <rightArrow/> : <leftArrow/>);
  }
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
        <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}