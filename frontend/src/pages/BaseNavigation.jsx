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
import CalendarIcon from "../assets/sidenav/calendar.png"
import LogoutIcon from "../assets/sidenav/logout.png"
import UserContext from "../contexts/UserContext"

const BaseNavigation = () => {
    let navigate = useNavigate()

    let [accessToken, setAccessToken] = useState(window.localStorage.getItem("accessToken"))
    let [user, setUser] = useState(null)

    let roleId = user && user.role_id && user.role_id
    let isAdmin = roleId === 1
    let isMM = roleId === 2
    let isAdminOrMM = isAdmin || isMM

    function gotoSignIn() { navigate("/signin") }
    function gotoSignInIfNotAuthorized() {
        if (!accessToken) gotoSignIn()
    }

    function fetchUser() {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/me', {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setUser(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
            }
        }

        getData()

        return () => aborter.abort()
    }

    function gotoHomeIfRouteIsIndex() {
        if (path === '/') navigate('/home')
    }

    function redirectAccordingToRole() {
        let resultantRoute = null
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
    useEffect(fetchUser, [])


    console.log('Base Navigation Called')

    let [showLogoutDialog, setShowLogoutDialog] = useState(false)
    return (
        <>
            <AuthContext.Provider value={accessToken}>
                <UserContext.Provider value={user}>
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
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/home')} 
                                src={HomeIcon}
                                cta="Dashboard" 
                                onClick={() => {navigate('/home')}}
                            />}
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/users')} 
                                src={UsersIcon}
                                cta="Users" 
                                onClick={() => {navigate('/users')}}
                            />}
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/faculty')} 
                                src={DepartmentsIcon}
                                cta="Faculty" 
                                onClick={() => {navigate('/faculty')}}
                            />}
                            <SideNavItem 
                                selected={path.startsWith('/contribution')}
                                src={ContributionIcon}
                                cta="Contributions" 
                                onClick={() => {navigate('/contribution')}}
                            />
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/academicyear')}
                                src={CalendarIcon}
                                cta="Academic Year" 
                                onClick={() => {navigate('/academicyear')}}
                            />}
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
                </UserContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default BaseNavigation