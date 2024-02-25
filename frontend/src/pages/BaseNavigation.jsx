import { Outlet, useLocation, useNavigate } from "react-router"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import { useEffect, useState } from "react"
import Dialog from "../components/Dialog"

export default () => {
    let navigate = useNavigate()

    function gotoSignIn() { navigate("/signin") }
    function gotoSignInIfNotAuthorized() {
        if (!window.localStorage.getItem("accessToken")) gotoSignIn()
    }

    function gotoHomeIfRouteIsIndex() {
        if (path === '/') navigate('/home')
    }

    function logout() {
        console.log("Logout called")
        window.localStorage.removeItem("accessToken", null)
        gotoSignIn()
    }

    let location = useLocation();
    let path = location.pathname

    useEffect(gotoHomeIfRouteIsIndex)
    useEffect(gotoSignInIfNotAuthorized)

    let [showLogoutDialog, setShowLogoutDialog] = useState(false)
    return (
        <>
            {showLogoutDialog && <Dialog
                title="Logout"
                message="Are you sure you wish to logout?"
                confirmCTA={"Logout"}
                onConfirm={logout}
                dismissCTA={"Cancel"}
                onDismiss={() => { setShowLogoutDialog(false) }}
            />}
            <div className="h-screen flex bg-slate-50">
                {/* left side */}
                <SideNav>
                    <SideNavItem 
                        selected={path.startsWith('/home')} 
                        cta="Dashboard" 
                        onClick={() => {navigate('/home')}}
                    />
                    <SideNavItem 
                        selected={path.startsWith('/users')} 
                        cta="Users" 
                        onClick={() => {navigate('/users')}}
                    />
                    <SideNavItem 
                        selected={path.startsWith('/faculty')} 
                        cta="Faculty" 
                        onClick={() => {navigate('/faculty')}}
                    />
                    <SideNavItem 
                        selected={path.startsWith('/contribution')}
                        cta="Contributions" 
                        onClick={() => {navigate('/contribution')}}
                    />
                    <SideNavItem 
                        cta="Logout"
                        onClick={() => { setShowLogoutDialog(true) }}
                    />
                </SideNav>
                {/* right
                side */}

                <div className="grow">
                    <Outlet/>
                </div>
                {/* <h1>Welcome to Dashboard!</h1> */}
                {/* <button onClick={logout}>Logout</button> */}
            </div>
        </>
    )
}