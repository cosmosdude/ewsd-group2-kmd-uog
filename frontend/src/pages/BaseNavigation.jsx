import { Outlet, useLocation, useNavigate } from "react-router"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import { useEffect, useState } from "react"
import Dialog from "../components/Dialog"
import AuthContext from "../contexts/AuthContext"

import HomeIcon from "../assets/sidenav/home.svg"
import ContributionIcon from "../assets/sidenav/contributions.png"
import DepartmentsIcon from "../assets/sidenav/departments.png"
import UsersIcon from "../assets/sidenav/users.png"
import LogoutIcon from "../assets/sidenav/logout.png"

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

    console.log('Base Navigation Called')

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
                            src={HomeIcon}
                            cta="Dashboard" 
                            onClick={() => {navigate('/home')}}
                        />
                        <SideNavItem 
                            selected={path.startsWith('/users')} 
                            src={UsersIcon}
                            cta="Users" 
                            onClick={() => {navigate('/users')}}
                        />
                        <SideNavItem 
                            selected={path.startsWith('/faculty')} 
                            src={DepartmentsIcon}
                            cta="Faculty" 
                            onClick={() => {navigate('/faculty')}}
                        />
                        <SideNavItem 
                            selected={path.startsWith('/contribution')}
                            src={ContributionIcon}
                            cta="Contributions" 
                            onClick={() => {navigate('/contribution')}}
                        />
                        <SideNavItem 
                            selected={path.startsWith('/academicyear')}
                            src={null}
                            cta="Academic Year" 
                            onClick={() => {navigate('/academicyear')}}
                        />
                        <SideNavItem 
                            cta="Logout"
                            src={LogoutIcon}
                            onClick={() => { setShowLogoutDialog(true) }}
                        />
                    </SideNav>
                    {/* right
                    side */}

                    <div className="block grow h-full overflow-y-hidden">
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