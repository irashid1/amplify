import { useSpring, animated } from "react-spring"
import { useState } from "react"

const Modal = ({ showModal, setShowModal }) => {

    const [logInToggle, setLogInToggle] = useState()

    const handleLogIn = () => {
        setShowModal(false)
    }

    // const handleSignIn = () => {
    //     setLogInToggle(!logInToggle)
    // }

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
                            {!logInToggle ? 

                            <>
                                 <div className="signInToggle">
                                    <p onClick={() => setLogInToggle(false)}>Sign In</p>
                                    <p onClick={() => setLogInToggle(true)}>Sign Up</p>
                                </div>

                                <h2>Sign In</h2>

                                <label className="sr-only" htmlFor="userEmail"> Email </label>
                                <input placeholder="Email" type="email" id="email" />

                                <label className="sr-only" htmlFor="userPassword"> Password </label>
                                <input placeholder="Password" type="passsword" id="password" />

                                <button> Enter </button>

                                <p onClick={handleLogIn}>Continue As Guest</p>
                            </>

                            : 
                            <>
                                <div className="signUpToggle">
                                    <p onClick={() => setLogInToggle(false)}>Sign In</p>
                                    <p onClick={() => setLogInToggle(true)}>Sign Up</p>
                                </div>

                                <h2>Sign Up</h2>

                                <label className="sr-only" htmlFor="userName"> User Name </label>
                                <input placeholder="User Name" type="text" id="name" />

                                <label className="sr-only" htmlFor="userEmail"> Email </label>
                                <input placeholder="Email" type="email" id="email" />

                                <label className="sr-only" htmlFor="userPassword"> Password </label>
                                <input placeholder="Password" type="passsword" id="password" />

                                <button > Enter </button>

                                <p onClick={handleLogIn}>Continue As Guest</p>
                            </>
                            }
                        </form>
                    </div>
                </animated.div>
                
            </div> : null}
        </>
    )

}

export default Modal