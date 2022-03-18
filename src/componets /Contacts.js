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
                            <li>Portfolio</li>
                            <li>Linkedin</li>
                            <li>GitHub</li>
                        </ul>
                    </div>

                    <div className="info">
                        <p>About Solomon</p>
                        <ul>
                            <li>Portfolio</li>
                            <li>Linkedin</li>
                            <li>GitHub</li>
                        </ul>
                    </div>
                </div>    
            </div>
        </section>
    )
}

export default Contacts