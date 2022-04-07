import { FaHeadphonesAlt, FaBars } from 'react-icons/fa'

const Header = ({ handleLogout, setShowModal, user, setHasAccount }) => {

    return (
        <div className="headerContent wrapper">
            <div className="logo">
                <div className="headphones">
                    <FaHeadphonesAlt />
                </div>
                <h2>Amplify</h2>
            </div>

            <nav className='navText'>
                <ul>
                    <li><a href="#contact">Contact</a></li>
                    <span>|</span>
                    {user ?
                        <li onClick={handleLogout}>Logout</li>
                        :
                        <div className="userLogin">
                            <li onClick={() => { setShowModal(true); setHasAccount(true) }} >Log in</li>
                            <li onClick={() => { setShowModal(true); setHasAccount(false) }} >Sign up</li>
                        </div>
                    }

                </ul>

            </nav>

            <nav className='navIcon'>
                <button>
                    <FaBars />
                </button>
                <ul>
                    <li><a href="#contact">Contact</a></li>
                    {user ?
                        <li onClick={handleLogout}>Logout</li>
                        :
                        <div className="userLogin">
                            <li onClick={() => { setShowModal(true); setHasAccount(true) }} >Log in</li>
                            <li onClick={() => { setShowModal(true); setHasAccount(false) }} >Sign up</li>
                        </div>
                    }

                </ul>
            </nav>

        </div>
    )
}

export default Header