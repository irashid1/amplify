import { FaHeadphonesAlt } from 'react-icons/fa'

const Header = ({ handleLogout, setShowModal, user, setHasAccount}) => {

    return(
        <>
            <div className="logo">
                <div className="headphones">
                    <FaHeadphonesAlt />
                </div>
                <h2>Amplify</h2>
            </div>

            {user ?
                <p onClick={handleLogout}>Logout</p>
                :
                <div>
                    <p onClick={() => {setShowModal(true); setHasAccount(true)} } >Log in</p>
                    <p onClick={() => { setShowModal(true); setHasAccount(false)} } >Sign up</p>
                </div>

            }
        </>
    )
}

export default Header