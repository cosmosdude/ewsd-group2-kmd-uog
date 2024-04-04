import { Outlet, useLocation, useNavigate } from "react-router"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import { useEffect, useState } from "react"
import Dialog from "../components/Dialog"
import { useAuthContext } from "../contexts/AuthContext"

import HomeIcon from "../assets/sidenav/home.svg"
import ContributionIcon from "../assets/sidenav/contributions.svg"
import DepartmentsIcon from "../assets/sidenav/departments.svg"
import UsersIcon from "../assets/sidenav/users.svg"
import CalendarIcon from "../assets/sidenav/calendar.svg"
import LogoutIcon from "../assets/sidenav/logout.png"
import UserContext from "../contexts/UserContext"
import TopNav from "../components/TopNav"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import NotiSystem, { usePushNoti } from "../components/Noti/NotiSystem"
import { useAuthState } from "../hooks/AuthToken/AuthToken"
import { useUserContext } from "../hooks/UserData/UserData"
import { loginTime } from "../util/last_login_time"

/**
 * Base navigation handler. 
 * Composed of left side nav bar and right side content view.
 * */
export default function BaseNavigation() {
    let pushNoti = usePushNoti()

    let navigate = useNavigate()
    let {pathname: path} = useLocation();

    // let [accessToken, setAccessToken] = useState(window.localStorage.getItem("accessToken"))
    let [accessToken, setAccessToken] = useAuthState()
    // fetch user detail upon accessToken change
    let user = useEffectUserDetail()

    let cachedUser = useUserContext()
    let isGuest = cachedUser?.role_name === 'guest'
    console.log("Role Name", cachedUser.role_name, "is guest", isGuest)

    let [showNav, setShowNav] = useState(false)

    let [showWelcome, setShowWelcome] = useState(false)

    let roleId = user && user.role_id && user.role_id
    let isAdmin = roleId === 1
    let isMM = roleId === 2
    let isMC = roleId === 3 
    let isAdminOrMM = isAdmin || isMM

    function gotoSignIn() { navigate("/signin") }
    function gotoSignInIfNotAuthorized() {
        if (!accessToken) gotoSignIn()
    }

    function redirectIfRouteIsIndex() {
        if (path === '/') // if strictly equal to index
        navigate('/contribution')
    }

    function gotoProfile() {
        // if user is null, just return
        if (!user) return

        console.log(user)
        navigate(`/users/${user.user_id}`)
    }

    function logout() {
        console.log("Logout called")
        // window.localStorage.removeItem("accessToken", null)
        setAccessToken(null)
        // gotoSignIn()
    }

    useEffect(() => {
        console.log("[Welcome]", "loginTime.value", loginTime.value)
        if (!loginTime.value) {
            console.log("[Welcome]", "Not Null")
            // window.alert("Welcome")
            setShowWelcome(true)
        }
        loginTime.value = "non-null"
    }, [])

    // useEffect(redirectIfRouteIsIndex)
    useEffect(gotoSignInIfNotAuthorized)

    // upon browser location change
    useEffect(() => {
        // reset nav overlay if it is shown
        // i.e hide nav overlay on mobile devices
        setShowNav(false)

        // Redirect if required
        redirectIfRouteIsIndex()
    }, [location])

    let [showLogoutDialog, setShowLogoutDialog] = useState(false)
    return (
        <>
            <UserContext.Provider value={user}>
                {showLogoutDialog && <Dialog
                    title="Logout"
                    message="Are you sure you wish to logout?"
                    confirmCTA={"Logout"}
                    onConfirm={logout}
                    dismissCTA={"Cancel"}
                    onDismiss={() => { setShowLogoutDialog(false) }}
                />}
                {showWelcome && <Dialog 
                    title="Hello" 
                    message="Welcome to university's magazine website"
                    style="normal"
                    dismissCTA="Dismiss"
                    onDismiss={() => {setShowWelcome(false)}}
                />}
                <div className="flex flex-col w-full h-screen ">
                    {/* <div className="w-full h-full"> */}
                    <TopNav
                        allowHamburger={!isGuest}
                        onNav={ () => {
                            setShowNav(x => !x)
                        }}
                        userId={user.user_id}
                        onProfile={gotoProfile}
                        onLogout={() => { setShowLogoutDialog(true) }}
                    />
                    <div className="relative flex grow bg-white overflow-hidden">
                        {/* Nav Overlay */}
                        <div className={`
                        absolute ${showNav ? 'block opacity-100': 'hidden opacity-0'}
                        md:hidden
                        z-[10000]
                        w-full h-full bg-[rgba(0,0,0,0.5)] transition-100
                        `}>
                        </div>
                        {/* left side */}
                        {!isGuest && <SideNav showForSM={showNav}>
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
                            {isMC && <SideNavItem 
                                selected={path.startsWith('/guests')} 
                                src={UsersIcon}
                                cta="Guests" 
                                onClick={() => {navigate('/guests')}}
                            />}
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/faculty')} 
                                src={DepartmentsIcon}
                                cta="Faculty" 
                                onClick={() => {navigate('/faculty')}}
                            />}
                            <SideNavItem 
                                selected={
                                    path.startsWith('/contribution') ||
                                    path.startsWith('/magazine') ||
                                    path.startsWith('/article')
                                }
                                src={ContributionIcon}
                                cta="Magazines" 
                                onClick={() => {navigate('/contribution')}}
                            />
                            {isAdmin && <SideNavItem 
                                selected={path.startsWith('/academicyear')}
                                src={CalendarIcon}
                                cta="Academic Year" 
                                onClick={() => {navigate('/academicyear')}}
                            />}
                        </SideNav>}
                        

                        {/* right side */}
                        <div className="block grow h-full overflow-y-hidden">
                            <Outlet/>
                        </div>

                        {/* <h1>Welcome to Dashboard!</h1> */}
                        {/* <button onClick={logout}>Logout</button> */}
                    </div>
                </div>
            </UserContext.Provider>
        </>
    )
}