import { useSpring, animated } from "react-spring"

const Modal = ({ showModal, setShowModal }) => {

    const handleLogin = () => {
        setShowModal(false)
    }

    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translate(0%)` : `translate(-100%)`
    });



    return (

        <>
        {showModal ?
            <div className="modalContainer">

                <animated.div style={animate}>
                    <div className="modalContent">
                        <form onSubmit={handleLogin}>
                            <label className="sr-only" htmlFor="userName"> User Name </label>
                            <input placeholder="User Name" type="text" id="name" />

                            <label className="sr-only" htmlFor="userEmail"> User Email </label>
                            <input placeholder="User Email" type="email" id="email" />
                            
                            <button> Enter </button>
                        </form>
                    </div>
                </animated.div>
                
            </div> : null}
        </>
    )

}

export default Modal