import { Outlet, useLocation, useNavigate } from "react-router"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import { useEffect, useState } from "react"
import Dialog from "../components/Dialog"
import AuthContext from "../contexts/AuthContext"

const BaseNavigation = () => {
    let navigate = useNavigate()

    let [accessToken, setAccessToken] = useState(window.localStorage.getItem("accessToken"))

    function gotoSignIn() { navigate("/signin") }
    function gotoSignInIfNotAuthorized() {
        if (!accessToken) gotoSignIn()
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

    console.log(accessToken)

    let [showLogoutDialog, setShowLogoutDialog] = useState(false)
    return (
        <>
            <AuthContext.Provider value={accessToken}>
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

                    <div className="grow overflow-y-hidden">
                        <Outlet/>
                    </div>
                    {/* <h1>Welcome to Dashboard!</h1> */}
                    {/* <button onClick={logout}>Logout</button> */}
                </div>
            </AuthContext.Provider>
        </>
    )
}

export default BaseNavigation