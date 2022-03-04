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

    const [playPause, setPlayPause] = useState(false); // determines whether the song is in play or pause state
    
    const [updatedList, setUpdatedList] = useState(false); // state used for keeping the track playing on the background while user searches for a new term or changing page index
    const [updatedPage, setUpdatedPage] = useState(false);

    //for pages 
    const [pageIndex, setPageIndex] = useState(0);

    // event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
        setUpdatedList(false);
        setPageIndex(0); // resets the page index to 0 every time user searches for a new track
    }

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const handlePlayPause = (event) => {

        if (event === currentTrack) {
            setPlayPause(!playPause);
        } else {
            setCurrentTrack(event);
            setPlayPause(false);
        }

    } // this determines whether we pause/play the current track or play a new track

    // axios call
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
                    // current key Imtiaz key#2
                    'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    'x-rapidapi-key': 'cd74434576msh2f5cc3adcc9d925p11959ejsnfe4483674b62' 

                    // additional keys

                    // Solomon key#1
                    // x-rapidapi-key': '4e6f74d025msh36947ff6c814c7cp11d0c1jsnc6f9a4f67eae'

                    // Solomon key#2
                    // 'x-rapidapi-key': '8b686888demsh8b501dde66c5b3dp12f3d2jsn655350bd72a5'

                    // Imtiaz key #1
                    // 'x-rapidapi-key': 'cd2f669506mshbacf9d2b7d2169ep15ef89jsnb7d5c64abf1d'
                
                }
            }).then((response) => {
                setSongList(response.data.tracks.hits);
                setUpdatedList(true); // has to be set after the songList since this is an async event
            }).catch(function (error) {
                console.error(error);
            });

        }

    }, [pageIndex, searchTerm])

    return (

        <div>

            <form onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="search"> Search For Music </label>
                <input placeholder="Search For Music" type="text" id="search" onChange={handleChange} value={userInput} />
                <button> Search </button>
            </form>

            {searchTerm ? <Pages pageIndex={pageIndex} setPageIndex={setPageIndex} /> : null}

            {songList.map((song, index) => {
                song.track.index = index; // putting trackIndex on to the song object

                return (

                    <div onClick={() => handlePlayPause(song.track)} key={song.track.key}>
                        <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} />
                        <h2>{song.track.title}</h2>
                    </div>


                )
            })

            }

            {currentTrack ? <PlayMusic currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} playPause={playPause} setPlayPause={setPlayPause} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} setUpdatedList={setUpdatedList} updatedList={updatedList} updatedPage={updatedPage} setUpdatedPage={setUpdatedPage} /> : null}
            {/* if current track exists then pass values into playMusic component. Otherwise return null */}

        </div>

    )


}

export default GetMusic;
