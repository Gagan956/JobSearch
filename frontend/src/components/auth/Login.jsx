import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
          <Navbar />
          <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form onSubmit={submitHandler} className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6">
              <h1 className="font-bold text-2xl text-center mb-6">Welcome Back</h1>
      
              <div className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="email@example.com"
                  />
                </div>
      
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                  />
                </div>
      
                <div>
                  <Label>Role</Label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === 'student'}
                        onChange={changeEventHandler}
                      />
                      Student
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === 'recruiter'}
                        onChange={changeEventHandler}
                      />
                      Recruiter
                    </label>
                  </div>
                </div>
      
                <div>
                  {loading ? (
                    <Button className="w-full mt-6">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full mt-6">
                      Login
                    </Button>
                  )}
                </div>
      
                <p className="text-center text-sm mt-4">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default Login