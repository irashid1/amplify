import axios from "axios";
import { useState, useEffect } from "react";
import PlayMusic from "./PlayMusic";
import Pages from "./Pages";


const GetMusic = () => {

    // states 
    const [userInput, setUserInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [songList, setSongList] = useState([]);

    const [currentTrack, setCurrentTrack] = useState();

    const [playPause, setPlayPause] = useState(false);

    const [toggle, setToggle] = useState(false)

    //for pages 
    const [pageIndex, setPageIndex] = useState(0);

    // const [audio, setAudio] = useState([]);
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

     const handlePlayPause = (event) => {
        //    console.log(event);
        // setCurrentTrack(event);
        // setPlayPause(!playPause)
        setToggle(!toggle)
        if (event === currentTrack) {
            setPlayPause(!playPause)
        } else {
            setCurrentTrack(event);
            setPlayPause(false);
        }


    }








    // const options = {
    //     method: 'GET',
    //     url: 'https://shazam.p.rapidapi.com/search',
    //     params: { term: searchTerm, locale: 'en-US', offset: '0', limit: '5' },
    //     headers: {
    //         'x-rapidapi-host': 'shazam.p.rapidapi.com',
    //         'x-rapidapi-key': '4e6f74d025msh36947ff6c814c7cp11d0c1jsnc6f9a4f67eae'
    //     }
    // };

    // useEffect(() => {
    //     if (searchTerm) {
    //         axios.request(options).then(function (response) {
    //             setSongList(response.data.tracks.hits);
    //             // console.log(response.data.tracks);
    //         }, ).catch(function (error) {
    //             console.error(error);
    //         });  
    //     }
    // }, [searchTerm])

    useEffect(() => {
        if (searchTerm) {
            axios({
                method: 'GET',
                url: 'https://shazam.p.rapidapi.com/search',
                params: {
                    term: searchTerm,
                    locale: 'en-US',
                    offset: pageIndex,
                    limit: '5'
                },
                headers: {
                    'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    'x-rapidapi-key': '8b686888demsh8b501dde66c5b3dp12f3d2jsn655350bd72a5'
                }
            }).then((response) => {
                setSongList(response.data.tracks.hits)
            }).catch(function (error) {
                console.error(error);
            });

        }
    }, [searchTerm, pageIndex])
    // took out the dependency array for deployment

    // const songResults = () => {
    //     songList.map( (song) => {
    //         console.log(song)
    //     })
    // }





    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="search"> Search For Music </label>
                <input placeholder="Search For Music" type="text" id="search" onChange={handleChange} value={userInput} />
                <button> Search </button>
            </form>
            {searchTerm ? <Pages pageIndex={pageIndex} setPageIndex={setPageIndex} /> : null}
            {songList.map((song, index) => {
                console.log(index)
                return (

                    <div onClick={() => handlePlayPause(song.track)} key={song.track.key}>
                        <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} />
                        <h2>{song.track.title}</h2>
                        {/* <audio src={song.track.hub.actions[1].uri} controls /> */}
                    </div>


                )
            })

                // console.log(currentTrack)
            }

            {currentTrack ? <PlayMusic currentTrack={currentTrack} playPause={playPause} setPlayPause={setPlayPause} toggle={toggle} setToggle={setToggle} /> : null}



        </div>
    )


}

export default GetMusic;
