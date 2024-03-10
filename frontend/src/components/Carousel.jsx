import ResponsiveCarousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

function Carousel({images = []}) {
    // console.log("Images", images)
    // if invalid or not array
    // assume empty
    if (!images || !Array.isArray(images)) images = []
    // console.log(images)
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
        <div className="aspect-[1/0.75] rounded w-full" onClick={e => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <ResponsiveCarousel 
                className="h-full rounded border" 
                responsive={responsive} 
                infinite={images.length > 1}
                autoPlay={images.length > 1}
                autoPlaySpeed={3000}
                arrows={images.length > 1}
                showDots={images.length > 1}
                dotListClass='
                gap-[3px]
                [&>li>button]:duration-1000
                [&>li>button]:transition-all
                [&>li>button]:border-[2px]
                [&>li>button]:border-neutral-200
                [&>li.react-multi-carousel-dot--active>button]:border-purple-500
                [&>li.react-multi-carousel-dot--active>button]:bg-neutral-200
                '
            >
                {images.map((x, i) => {
                    return (
                        <img className="object-cover aspect-[1/0.75] border" key={i} src={x}/>
                    )
                })}
            </ResponsiveCarousel>
        </div>
    );
}

export default Carousel;