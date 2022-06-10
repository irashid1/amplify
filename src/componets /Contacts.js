import { FaHeadphonesAlt } from 'react-icons/fa'

const Contacts = () => {

    return(
        <section>
            <div id='contact' className="infoContainer wrapper">
                <div className="logo">
                    <div className="headphones">
                        <FaHeadphonesAlt />
                    </div>
                    <h2>Amplify</h2>
                </div>

                <div className="infoContent">
                    <div className="info">
                        <p>About Imtiaz</p>
                        <ul>
                            <li><a href="https://www.imtiazrashid.com">Portfolio</a></li>
                            <li><a href="https://www.linkedin.com/in/imtiazrashid/">Linkedin</a></li>
                            <li><a href="https://github.com/irashid1">Github</a></li>
                        </ul>

                        
                    </div>

                </div>    
            </div>
        </section>
    )
}

export default Contacts