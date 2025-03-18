import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
// import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    // const {setUserData} = useContext(UserContext)
    const navigate = useNavigate()

    const handleGoogleClick = async()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result);
            const response = await axios.post('http://localhost:5000/api/auth/google',{
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                
                navigate('/');
            }
            // console.log(response);
            // if(response.status==200){
            //     setUserData(response.data.user)
            //     navigate('/')
            // }


        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleGoogleClick}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 
                             border border-gray-300 rounded-lg shadow-sm
                             text-gray-700 hover:text-red-600 hover:border-red-500
                             bg-white hover:bg-red-50 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <svg 
                        className="w-5 h-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path
                            d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                        />
                    </svg>
                    <span className="text-sm font-semibold">Continue with Google</span>
                </button>
            </div>
        </div>
    )
}