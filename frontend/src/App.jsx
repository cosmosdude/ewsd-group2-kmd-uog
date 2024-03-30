import "./style/tailwind.css"

import { Routes, Route } from 'react-router-dom'

import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import DashboardPage from './pages/DashboardPage'
import NotFoundPage from "./pages/NotFoundPage"
import UsersPage from "./pages/UsersPage"
import BaseNavigation from "./pages/BaseNavigation"
import StudentRegistrationPage from "./pages/StudentRegistrationPage"
import FacultiesPage from "./pages/FacultiesPage"
import NewFacultyPage from "./pages/NewFacultyPage"
import ContributionsPage from "./pages/ContributionsPage"
import UserDetailPage from "./pages/UserDetailPage"

import AcademicYearPage from "./pages/AcademicYearPage"

import NewAcademicYearPage from "./pages/NewAcademicYearPage"
import MagazineHistoryPage from "./pages/MagazineHistoryPage"
import MagazineCurrentPage from "./pages/MagazineCurrentPage"
import MagazineNewPage from "./pages/MagazineNewPage"
import MagazinePage from "./pages/MagazinePage"
import UploadPage from "./pages/UploadPage"
import StudentContributionHistoryPage from "./pages/StudentContributionHistoryPage"
import ArticleDetailPage from "./pages/ArticleDetailPage"

import routesConfig from "./configs/routes.config"
import LiveMagazinePage from "./pages/LiveMagazinePage"
import GuestListPage from "./pages/GuestListPage"
import UpdateContributionPage from "./pages/UpdateContributionPage"
import NotiSystem from "./components/Noti/NotiSystem"
import UserData from "./hooks/UserData/UserData"
import AuthToken from "./hooks/AuthToken/AuthToken"
import UpcomingMagazinesPage from "./pages/UpcomingMagazinesPage"
import FacultyDetailPage from "./pages/FacultyDetailPage"

function App() {
  return (
    <>
      <NotiSystem>
        <AuthToken>
          <UserData>
            <Routes>
                <Route path="/" element={<BaseNavigation/>}>
					<Route path="home" element={<DashboardPage/>}/>

					<Route path="users" element={<UsersPage/>}/>
					<Route path="users/new" element={<StudentRegistrationPage/>}/>
					<Route path="users/:id" element={<UserDetailPage/>}/>

					<Route path="guests" element={<GuestListPage/>}/>

					<Route path="faculty" element={<FacultiesPage/>}/>
					<Route path="faculty/:id" element={<NewFacultyPage/>}/>
					<Route path="faculty/:id/detail" element={<FacultyDetailPage/>}/>

					<Route path="contribution" element={<ContributionsPage/>}/>
					<Route path="magazine/history" element={<MagazineHistoryPage/>}/>
					<Route path="magazine/history/:magazineId" element={<MagazinePage/>}/>
					<Route path="magazine/current" element={<MagazineCurrentPage/>}/>
					<Route path="magazine/current/:magazineId/view" element={<LiveMagazinePage/>}/>
					<Route path="magazine/current/history" element={<StudentContributionHistoryPage/>}/>
					{/* Create and Update  */}
					<Route path="magazine/current/:id" element={<MagazineNewPage/>}/>

					<Route path="magazine/upcoming" element={<UpcomingMagazinesPage/>}/>

					<Route path="academicyear" element={<AcademicYearPage/>}/>
					<Route path="academicyear/:id" element={<NewAcademicYearPage/>}/>

					<Route path={routesConfig.contribution.upload()} element={<UploadPage/>}/>
					<Route path={routesConfig.contribution.update()} element={<UpdateContributionPage/>}/>
					<Route 
						path={routesConfig.contribution.detail()} 
						element={<ArticleDetailPage/>}
					/>

                  
                </Route>
              
              
            	<Route path="/signin" element={<SignInPage/>}/>
            	<Route path="/signup" element={<SignUpPage/>}/>

				{/*Any route not specified above will be treated as 404*/}
				<Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </UserData>
        </AuthToken>
      </NotiSystem>
    </>
  )
}

export default App
