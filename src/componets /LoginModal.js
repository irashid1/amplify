import { useSpring, animated } from "react-spring"

const LoginModal = ({ email, setEmail, password, setPassword, handleLogin, handleSignUp, emailError, passwordError, hasAccount, setHasAccount, user }) => {



    // states for firebase


    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: !user ? 1 : 0,
        transform: !user ? `translateY(0%)` : `translateY(-100%)`
    });



    return (
        
        <>
      
            <div className="modalContainer">

                <animated.div style={animate}>
                    <div className="modalContent">
                        <form>

                            <>

                                <label htmlFor="userEmail"> Email </label>
                                <input type="email" id="email" autoFocus required onChange={ (e) => setEmail(e.target.value)} value={email}/>
                                <p className="errorMessage">{emailError}</p>

                                <label htmlFor="userPassword"> Password </label>
                                <input type="passsword" id="password" required onChange={ (e) => setPassword(e.target.value)} value={password}/>
                                <p className="errorMessage">{passwordError}</p>

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
    
        </>
    )

}

export default LoginModal