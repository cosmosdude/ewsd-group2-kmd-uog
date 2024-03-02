import "./style/tailwind.css"

import { Routes, Route, Outlet } from 'react-router-dom'

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

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<BaseNavigation/>}>
            <Route path="home" element={<DashboardPage/>}/>

            <Route path="users" element={<UsersPage/>}/>
            <Route path="users/new" element={<StudentRegistrationPage/>}/>
            <Route path="users/:id" element={<UserDetailPage/>}/>

            <Route path="faculty" element={<FacultiesPage/>}/>
            <Route path="faculty/new" element={<NewFacultyPage/>}/>
            <Route path="faculty/:id" element={<p>Faculty details</p>}/>

            <Route path="contribution" element={<ContributionsPage/>}/>
            <Route path="magazine/history" element={<MagazineHistoryPage/>}/>
            <Route path="magazine/history/:magazineId" element={<MagazinePage/>}/>
            <Route path="magazine/current" element={<MagazineCurrentPage/>}/>
            <Route path="magazine/current/:id" element={<MagazineNewPage/>}/>

            <Route path="academicyear" element={<AcademicYearPage/>}/>
            <Route path="academicyear/:id" element={<NewAcademicYearPage/>}/>
          </Route>
          
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>

          {/*Any route not specified above will be treated as 404*/}
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </>
  )
}

export default App
