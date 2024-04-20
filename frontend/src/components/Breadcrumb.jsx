import { Fragment } from "react"
import { Link } from "react-router-dom"
import { useUserContext } from "../hooks/UserData/UserData"


const Breadcrumb = ({links = [], className = ""}) => {

    let user = useUserContext()

    function modifiedLink(l) {
        if (l === '/home' && !["administrator", "m_manager", "m_coordinator"].includes(user.role_name))
        return "/contribution"
        else
        return l
    }

    let shouldShow = links.length > 2

    return (
        <ul className={`flex gap-2 items-center ${className}`}>
            {links.map((item, index) => {
                let isFirst = index === 0
                let isLast = index === (links.length - 1)
                let isMiddle = !isFirst && !isLast
                let shouldHide = isMiddle || (isFirst && links.length > 2)
                return (
                    <Fragment key={`${index}`} >
                        <li className={`${shouldHide ? 'hidden' : 'list-item'} md:list-item`}>
                            <Link 
                                className={`
                                font-serif text-sm
                                ${item.current && 'text-blue-400'} 
                                hover:opacity-50 transition-all
                                `} 
                                to={modifiedLink(item.link)}
                            >{item.name}</Link>
                        </li>
                        {!isLast && (<li className={`${shouldHide ? 'hidden' : 'list-item'} md:list-item font-serif text-sm`}>/</li>)}
                        {shouldShow && isFirst && <li className={`list-item md:hidden`}>
                            <Link 
                                className={`
                                font-serif text-sm
                                hover:opacity-50 transition-all
                                `} 
                                to={-1}
                            >. . .</Link>
                        </li>}
                        {shouldShow && isFirst && <li className={`list-item md:hidden font-serif text-sm`}>/</li>}
                    </Fragment>
                )
            })}
        </ul>
    )
}
export default Breadcrumb