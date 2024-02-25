import "./style/tailwind.css"

import { Routes, Route, Outlet } from 'react-router-dom'

import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from "./pages/NotFoundPage"
import UsersPage from "./pages/UsersPage"
import BaseNavigation from "./pages/BaseNavigation"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseNavigation/>}>
          <Route path="home" element={<DashboardPage/>}/>
          <Route path="users" element={<UsersPage/>}/>
          <Route path="users/new" element={<p>New Registration</p>}/>
          <Route path="faculty" element={<p>Faculties</p>}/>
          <Route path="contribution" element={<p>Contributions</p>}/>
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
