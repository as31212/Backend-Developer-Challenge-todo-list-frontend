import { loginFormDataInterface } from "../interfaces/loginFormDataInterface";
import { ChangeEvent, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { storeInterface } from "../interfaces/storeInterface";
import { Link, useNavigate } from "react-router";

const Login: React.FC = () => {
    const [formData,setFormData] = useState<loginFormDataInterface>({
        email : "",
        password: ""
    });

    const userData = useSelector((state:storeInterface)=>state.userData);
    const navigate = useNavigate();

    const changeInput = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    }

    useEffect(()=>{
      console.log(userData);
      
        if(userData.id !== ""){
            navigate("/home");
        }
    },[])

    // test
useEffect(()=>{
    console.log(formData);
},[formData])
    // test

    const {loginUser,loading,error} = useLogin();

    
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      loginUser("http://localhost:8881/auth/login",formData)
      console.log('Form submitted');
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to='/signin' className="font-medium text-blue-600 hover:text-blue-500">
              register for a new account
            </Link>
          </p>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={changeInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={changeInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
                <p className="text-red-400">{error}</p>
              </div>
            </form>
  
           
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;