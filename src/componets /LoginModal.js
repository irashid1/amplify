import { useSpring, animated } from "react-spring"
import { RiCloseCircleFill } from "react-icons/ri"
import { FaHeadphonesAlt } from 'react-icons/fa'

const LoginModal = ({ email, setEmail, password, setPassword, handleLogin, handleSignUp, emailError, passwordError, hasAccount, setHasAccount, showModal, setShowModal }) => {



    // states for firebase


    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `opacity(0%)` : `opacity(100%)`, 
        
    });



    return (
        
        <>
            {showModal ?
                <div className="modalContainer">

                    <animated.div style={animate}>
                        <div className="modalContent">
                            <form>

                                <>
                                    <div className="modalHeader">
                                        <p><span><FaHeadphonesAlt /></span>Amplify</p>
                                        <div className="closeIcon" onClick={ () => setShowModal(false) }>
                                            <RiCloseCircleFill />
                                        </div>
                                    </div>

                                    <div className="loginInfo">
                                        
                                        <div className="inputField">
                                            <label htmlFor="userEmail"> Email </label>
                                            <input type="email" id="email" required onChange={ (e) => setEmail(e.target.value)} value={email}/>
                                            <p className="errorMessage">{emailError}</p>
                                        </div>

                                        <div className="inputField">
                                            <label htmlFor="userPassword"> Password </label>
                                            <input type="password" id="password" required onChange={ (e) => setPassword(e.target.value)} value={password}/>
                                            <p className="errorMessage">{passwordError}</p>
                                        </div>

                                    </div>

                                    { hasAccount ?
                                    <>
                                        <button onClick={handleLogin}> Sign In </button>
                                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}> Sign up</span></p>
                                    </>
                                    :
                                    <>
                                        <button onClick={handleSignUp}> Sign up </button>
                                        <p>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}> Sign In</span></p>
                                    </>
                                    }
                                    

                                </>

                            
                            </form>
                        </div>
                    </animated.div>
                    
                </div>
                : null

            }
        </>
    )

}

export default LoginModal