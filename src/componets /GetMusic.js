import axios from "axios";
import { useState, useEffect } from "react";

const GetMusic = () => {

    // states 
    const [userInput, setUserInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [songList, setSongList] = useState([]);
    // const [submitButton, setSubmitButton] = useState(false);

    // event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        // setSubmitButton(!submitButton);
        setSearchTerm(userInput);
    }

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: { term: searchTerm, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': '4e6f74d025msh36947ff6c814c7cp11d0c1jsnc6f9a4f67eae'
        }
    };

    useEffect(() => {
        if (searchTerm) {
            axios.request(options).then(function (response) {
                setSongList(response.data.tracks.hits);
                // console.log(response.data.tracks);
            }, [options])
            .catch(function (error) {
                console.error(error);
            });  
        }
    }, [searchTerm])
    // took out the dependency array for deployment

    // const songResults = () => {
    //     songList.map( (song) => {
    //         console.log(song)
    //     })
    // }

   


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search"> Search For Music </label>
                <input type="text" id="search" onChange={handleChange} value={userInput} />
                <button> Search </button>
            </form>
            {

                console.log(songList)
            
            


            }
        </div>
    )
    

}

export default GetMusic;