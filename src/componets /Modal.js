import { useSpring, animated } from "react-spring"
import { useState } from "react"

const Modal = ({ showModal, setShowModal, userInfo, setUserInfo }) => {

    // states for firebase
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [userSignUp, setUserSignUp] = useState(false);
    

    // submit function
    const handleLogIn = (event) => {
        event.preventDefault();
        setShowModal(false); 
    }

    const handleSignUp = (event) => {
        setUserSignUp(!userSignUp);
    }

    // userChange
    const handleUserEmail = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value);
    }

    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });



    return (

        <>
        {showModal ?
            <div className="modalContainer">

                <animated.div style={animate}>
                    <div className="modalContent">
                        <form onSubmit={handleLogIn}>

                            <>

                                <label htmlFor="userEmail"> Email </label>
                                        <input type="email" id="email" onChange={handleUserEmail} value={userEmail}/>

                                <label htmlFor="userPassword"> Password </label>
                                        <input type="passsword" id="password" onChange={handleUserPassword} value={userPassword}/>

                                { !userSignUp ?
                                <>
                                    <button> Sign In </button>
                                    <p>Don't have an account?<span onClick={() => { handleSignUp() }}>Sign up</span></p>
                                </>
                                :
                                <>
                                    <button> Sign up </button>
                                    <p>Already have an account?<span onClick={() => { handleSignUp() }}>Sign In</span></p>
                                </>
                                }
                                

                            </>

                         
                        </form>
                    </div>
                </animated.div>
                
            </div> : null}
        </>
    )

}

export default Modal