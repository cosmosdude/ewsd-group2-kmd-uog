import "../style/tailwind.css"
import SideNavItem from "./SideNavItem"

const SideNav = ({children}) => {
    return (
        <aside className="hidden md:block min-w-[250px] bg-gray-100">
            <header className="block p-4 text-center text-xl font-bold">Large University</header>
            <nav className="mt-[16px]">
                <ul>
                    {children}
                </ul>
            </nav>
        </aside>
    )
}
export default SideNav