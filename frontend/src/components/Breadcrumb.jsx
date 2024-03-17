import { Fragment } from "react"
import { Link } from "react-router-dom"


const Breadcrumb = ({links = [], className = ""}) => {
    return (
        <ul className={`flex gap-2 items-center ${className}`}>
            {links.map((item, index) => {
                let isLast = index == (links.length - 1)
                return (
                    <Fragment key={`${index}`} >
                        <li>
                            <Link 
                                className={`
                                
                                font-serif text-sm
                                ${item.current && 'text-blue-400'} 
                                hover:opacity-50 transition-all
                                `} 
                                to={item.link}
                            >{item.name}</Link>
                        </li>
                        {!isLast && (<li className="font-serif text-sm">/</li>)}
                    </Fragment>
                )
            })}
        </ul>
    )
}
export default Breadcrumb