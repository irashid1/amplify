import { FaHeadphonesAlt, FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'
// import { useState } from 'react';

const Header = ({ handleLogout, setShowModal, user, setHasAccount, hamburgerMenu, setHamburgerMenu }) => {

    

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
                {hamburgerMenu
                    ?
                    <>
                        <button onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                            <MdClose />
                        </button>

                        <ul className='menuActive'>
                            <li onClick={() => setHamburgerMenu(false)}><a href="#contact" >Contact</a></li>
                            {user ?
                                <li onClick={handleLogout}>Logout</li>
                                :
                                <div className="userLogin">
                                    <li onClick={() => { setShowModal(true); setHasAccount(true); setHamburgerMenu(false) }} >Log in</li>
                                    <li onClick={() => { setShowModal(true); setHasAccount(false); setHamburgerMenu(false) }} >Sign up</li>
                                </div>
                            }

                        </ul>
                    </>
                    :
                    <>
                        <button onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                            <FaBars />
                        </button>

                        <ul >
                            <li onClick={() => setHamburgerMenu(false)}><a href="#contact" >Contact</a></li>
                            {user ?
                                <li onClick={handleLogout}>Logout</li>
                                :
                                <div className="userLogin">
                                    <li onClick={() => { setShowModal(true); setHasAccount(true); setHamburgerMenu(false) }} >Log in</li>
                                    <li onClick={() => { setShowModal(true); setHasAccount(false); setHamburgerMenu(false) }} >Sign up</li>
                                </div>
                            }

                        </ul>
                    </>
                }


                {/* {
                    !hamburgerMenu ?

                        <>
                            <button onClick={setHamburgerMenu(!hamburgerMenu)}>
                                <MdClose />
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
                        </>

                    :
                        <>
                            <button onClick={setHamburgerMenu(!hamburgerMenu)}>
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
                        </>
                } */}

            </nav>

        </div>
    )
}

export default Header