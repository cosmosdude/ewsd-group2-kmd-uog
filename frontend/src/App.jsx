import "./style/tailwind.css"

import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/*Any route not specified above will be treated as 404*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
