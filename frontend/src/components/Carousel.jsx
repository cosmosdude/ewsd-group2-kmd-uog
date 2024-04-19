import ResponsiveCarousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

import emptyImage from '../assets/illustrations/empty-image2.png'

import LeftArrowIcon from "../assets/leftarrow.png"
import RightArrowIcon from "../assets/rightarrow.png"

function CustomLeftArrow ({ onClick, ...rest }) {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
        <button className="absolute left-0 my-auto w-[35px] h-[35px] " onClick={() => onClick()}>
            <img className="w-full h-full" src={LeftArrowIcon}/>
        </button>
    );
}

function CustomRightArrow ({ onClick, ...rest }) {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
        <button className="absolute right-0 my-auto w-[35px] h-[35px] " onClick={() => onClick()}>
            <img className="w-full h-full" src={RightArrowIcon}/>
        </button>
    );
}

function Arrow ({ src, onClick, left, right, ...rest }) {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
        <button className={`
            absolute ${right ? 'right-0' : 'left-0'} my-auto w-[35px] h-[35px]
            bg-black/50
            hover:opacity-25
            transition-all 
        `} onClick={() => onClick()}>
            <img className="w-full h-full" src={src}/>
        </button>
    );
}

function Carousel({images = []}) {
    // console.log("Images", images)
    // if invalid or not array
    // assume empty
    if (!images || !Array.isArray(images)) images = []
    console.log("Images", images)
    let responsive = {
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1,
          partialVisibilityGutter: 0
        }
    }

    // images = [...images, ...images, ...images]

    return (
        <div className="aspect-[1/0.75] rounded w-full relative" onClick={e => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            {<img 
                className="absolute rounded w-full h-full object-cover bg-black"
                src={emptyImage}
            />}
            {images.length > 0 && <ResponsiveCarousel 
                className="h-full rounded" 
                responsive={responsive} 
                infinite={images.length > 1}
                autoPlay={images.length > 1}
                autoPlaySpeed={3000}
                arrows={images.length > 1}
                // customLeftArrow="ok"
                rtl="false"
                customLeftArrow={<Arrow src={LeftArrowIcon}/>}
                customRightArrow={<Arrow src={RightArrowIcon} right/>}
                showDots={images.length > 1}
                dotListClass='
                gap-[3px]
                [&>li]:overflow-visible
                [&>li>button]:duration-1000
                [&>li>button]:transition-all
                [&>li>button]:border-[0px]
                [&>li>button]:bg-dark-200
                [&>li.react-multi-carousel-dot--active>button]:bg-white
                '
            >
                {images.map((x, i) => {
                    return (
                        <img className="object-cover aspect-[1/0.75] border" key={i} src={x}/>
                    )
                })}
            </ResponsiveCarousel>}
        </div>
    );
}

export default Carousel;