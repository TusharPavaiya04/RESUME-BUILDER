import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import CheckEmail from './pages/CheckEmail';  // add this import
import VerifyOTP from './pages/VerifyOTP';
import { useDispatch } from 'react-redux';
import api from './configs/api';
import { login, setLoading } from './app/features/authSlice';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast'
const App = () => {
   <Toaster />
  const dispatch=useDispatch()

  const getUserData=async()=>{
    const token=localStorage.getItem('token')
    try{
      if(token){

        const {data}=await api.get('/api/users/data',{headers:{
          Authorization:`Bearer ${token}`
        }})
        if(data.user){
          dispatch(login({token,user:data.user}))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false));
      }
    }catch(err){
      dispatch(setLoading(false))
      console.log(setLoading(false));
      console.log(err.message)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])
  return(
    <>
  <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="app" element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="builder/:resumeId" element={<ResumeBuilder/>}/>
      </Route>
      <Route path="view/:resumeId" element={<Preview/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/verify-otp/:email" element={<VerifyOTP/>}/> 
      <Route path='/reset-password/:email' element={<ResetPassword/>}/>
      <Route path="/verify-email" element={<VerifyEmail />} />
<Route path="/check-email" element={<CheckEmail />} />  {/* add this */}
    </Routes>
    </>
  );
}
export default App;
