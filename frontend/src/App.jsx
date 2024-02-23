import "./style/tailwind.css"

import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DashboardPage from './pages/DashboardPage'
import NotFound from "./pages/NotFound"
import UsersPage from "./pages/UsersPage"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<DashboardPage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/*Any route not specified above will be treated as 404*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
