import "../style/tailwind.css"
import SideNavItem from "./SideNavItem"

const SideNav = ({showForSM, children}) => {
    return (
        <aside className={`
        absolute md:static
        ${showForSM ? 'block opacity-100': 'hidden opacity-0'} 
        md:opacity-100 md:pointer-events-auto 
        z-50 md:z-auto md:block min-w-[250px] bg-gray-100 h-full overflow-scroll transition-all
        `}>
            {/* <header className="block p-4 text-center text-xl font-bold">Large University</header> */}
            <nav className="mt-[16px]">
                <ul>
                    {children}
                </ul>
            </nav>
        </aside>
    )
}
export default SideNav