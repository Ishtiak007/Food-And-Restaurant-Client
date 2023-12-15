
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import googleLogo from '../../assets/logo/googleLogo.png'


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    photoURL: res.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="space-y-3">
            <button onClick={handleGoogleSignIn} className="flex items-center gap-3 w-3/4 rounded-3xl p-2 outline outline-1 outline-slate-800 mx-auto"><img src={googleLogo} className="w-6" alt="" /> Continue With Google</button>
            {/* <button onClick={handleGithubLogIn} className="flex items-center gap-3 w-3/4 rounded-3xl p-2 outline outline-1 outline-slate-800 mx-auto"><FaGithub></FaGithub>Continue With Github</button> */}
        </div>
    );
};

export default SocialLogin;