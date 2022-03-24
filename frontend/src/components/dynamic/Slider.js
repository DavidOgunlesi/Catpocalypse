/**
 * Author: Ziratsu/Slider-React
 */
import React, {useState} from 'react';
import BtnSlider from './BtnSlider';
import OverlayUI from './OverlayUI';
import CatdexProfile from '../subpages/CatdexProfile';

export default function Slider({ownedCats}) {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if(slideIndex !== ownedCats.length){
            setSlideIndex(slideIndex + 1);
        } 
        else if (slideIndex === ownedCats.length){
            setSlideIndex(1);
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1);
        }
        else if (slideIndex === 1){
            setSlideIndex(ownedCats.length);
        }
    }

    const moveDot = index => {
        setSlideIndex(index);
    }

    return (
        <div className="container-slider">
            {ownedCats.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <CatdexProfile cat={obj}/>
                    </div>
                )
            })}
                <BtnSlider moveSlide={nextSlide} direction={"next"} anchor='right'/>
                <BtnSlider moveSlide={prevSlide} direction={"prev"} anchor='left'/>

            <div className="container-dots">
                {Array.from({length: ownedCats.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}