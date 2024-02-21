import "./style/tailwind.css"

import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={
          (
          <div className="flex flex-col h-screen items-center justify-center place-content-center">
            <h1 className="inline-block text-7xl font-extrabold">404</h1>
            <h1 className="inline-block text-3xl font-extrabold">Not Found</h1>
          </div>
          )
        }/>
      </Routes>
    </>
  )
}

export default App
