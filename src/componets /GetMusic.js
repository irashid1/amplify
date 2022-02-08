import axios from "axios";
import { useEffect } from "react";



const GetMusic = () => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: { term: 'kiss the rain', locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': '4e6f74d025msh36947ff6c814c7cp11d0c1jsnc6f9a4f67eae'
        }
    };

    useEffect( () => {
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    return(
      <div>

      </div>
    )

}

export default GetMusic;