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
    const [submitToggle, setSubmitToggle] = useState(false)

    //for pages 
    const [pageIndex, setPageIndex] = useState(0);

    // event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
        setSubmitToggle(false)
    }

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const handlePlayPause = (event) => {
        setToggle(!toggle)

        if (event === currentTrack) {
            setPlayPause(!playPause)
        } else {
            setCurrentTrack(event);
            setPlayPause(false);
        }

    }

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
                    'x-rapidapi-key': 'cd74434576msh2f5cc3adcc9d925p11959ejsnfe4483674b62'
                }
            }).then((response) => {
                

                setSongList(response.data.tracks.hits);

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
                song.track.index = index;

                return (

                    <div onClick={() => handlePlayPause(song.track)} key={song.track.key}>
                        <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} />
                        <h2>{song.track.title}</h2>
                    </div>


                )
            })

            }

            {currentTrack ? <PlayMusic currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} playPause={playPause} setPlayPause={setPlayPause} toggle={toggle} setToggle={setToggle} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} setSubmitToggle={setSubmitToggle} submitToggle={submitToggle} /> : null}



        </div>
    )


}

export default GetMusic;
