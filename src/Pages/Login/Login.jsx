
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const {signIn , googleLogin , githubLogin } = useContext(AuthContext) ;

  const location = useLocation() ;
  const navigate = useNavigate() ;
  const [eye , setEye] = useState(false) ;
  const [remember , setRemember] = useState(false) ;
  const [errorText , setErrorText] = useState(false) ;

  const handleSubmit = (e) => {
    e.preventDefault() ;

    const form = e.target ;
    const email = form.email.value ;
    const pass = form.password.value ;

    if(remember){
      signIn(email , pass) 
      .then((result) => {
        console.log(result.user);
        form.reset() ;
        toast.success('Login Success Fully !') ;
        setTimeout(() => {
          if(location.state){
            navigate(location.state) ;
          }
          else{
            navigate('/') ;
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        if(error.message.includes('Firebase: Error (auth/invalid-credential).')){
          toast.error("Password Isn't Match") ;
        }
      })
    }
    else{
      setErrorText('Please Accept Our Turms & Condition !') ;
    }
  }

  const handleGoogleLogin = () => {
    googleLogin()
    .then((result) => {
      console.log(result.user);
      toast.success('Login Success Fully !') ;
      setTimeout(() => {
        if(location.state){
          navigate(location.state) ;
        }
        else{
          navigate('/') ;
        }
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleGithubLogin = () => {
    githubLogin()
    .then((result) => {
      console.log(result);
      toast.success('Login Success Fully !') ;
      setTimeout(() => {
        if(location.state){
          navigate(location.state) ;
        }
        else{
          navigate('/') ;
        }
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center`}>
      <Card className="w-96 pt-11 shadow-none border my-20 lg:my-0">
        
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input required name="email" label="Email" size="lg" />
                <div className="relative">
              {
                eye ? 
                <IoMdEyeOff onClick={() => setEye(!eye)} className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"/> :
                <IoMdEye onClick={() => setEye(!eye)} className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"/>  
              }
              <Input 
              className="z-0"
              type={eye ? 'text' : 'password'} 
              name="password" 
              label="Password" 
              size="lg" 
              required />
            </div>
                <div className="-ml-2.5">
                    <Checkbox onClick={() => setRemember(!remember)} label="Turms & Condition" />
                </div>
                <div className="">
                  {
                    remember || <p className="text-red-800 font-semibold">{errorText}</p>
                  }
                </div>
                <input type="submit" className="w-full btn text-gray-800 btn-outline hover:bg-[#7a7a7a]" value={'Log In'} />
                <div className="divider">OR</div>
                <div className="w-full border border-[#343434] py-2 rounded-lg flex items-center justify-evenly">
                    <Button onClick={handleGoogleLogin} className="text-lg bg-transparent text-black border border-[#343434] hover:shadow-none"><FaGoogle /></Button>
                    
                    <Button onClick={handleGithubLogin} className="text-lg bg-transparent text-black border border-[#343434] hover:shadow-none"><FaGithub /></Button>
                </div>
            </form>
        </CardBody>

        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link className="text-blue-gray-900 font-bold mx-1 hover:underline" to={'/register'}>
              Register
            </Link>
          </Typography>
        </CardFooter>

      </Card>

      <ToastContainer
      position="top-center"
      autoClose={800}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />

    </div>
  );
};

export default Login;
