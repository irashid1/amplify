import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import PlayMusic from "./PlayMusic";
import Pages from "./Pages";
import "swiper/css/bundle";
import toast, { Toaster } from "react-hot-toast";
import TextField from '@mui/material/TextField';

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import SwiperCore, { EffectCoverflow, Pagination, Virtual, Navigation } from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination, Virtual, Navigation]);



const GetMusic = ({ user, setShowModal, searchTerm, setSearchTerm, userInput, setUserInput, stopMusic }) => {


    // states 


    const [songList, setSongList] = useState([]);

    const [currentTrack, setCurrentTrack] = useState();

    const [playPause, setPlayPause] = useState(false); // determines whether the song is in play or pause state

    const [updatedList, setUpdatedList] = useState(false); // state used for keeping the track playing on the background while user searches for a new term or changing page index
    const [updatedPage, setUpdatedPage] = useState(false);

    // toggle like

    const [liked, setLiked] = useState(false);

    //for pages 
    const [pageIndex, setPageIndex] = useState(0);

    const [coverflowIndex, setCoverflowIndex] = useState(0);

    const [pageChange, setPageChange] = useState(false);

    // const [errorPage, setErrorPage] = useState(false);

    const sliderRef = useRef();
    // const likeButtonRef = useRef();

    const inputProps = {
        name: "Search",
        placeholder: "Search For Music"
    }

    // resetLandingPage(setSearchTerm);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(userInput);
        setUpdatedList(false);
        setPageIndex(0); // resets the page index to 0 every time user searches for a new track
        // sliderRef.current.swiper.slideTo(0)  

    }
    // handles the submit button

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }
    // handles any change to the user input field

    const handlePlayPause = (event) => {

        if (event === currentTrack) {
            setPlayPause(!playPause);
        } else {
            setCurrentTrack(event);
            setPlayPause(false);
        }

    } 
    // this determines whether we pause/play the current track or play a new track

    const handleLiked = () => {

        setLiked(!liked);
        if (liked === true) {
            toast('Liked');
        }

    }
    // stretch goal
    // handle function for whether or not a song was liked, if a song is liked then notifies the user with toast

    useEffect(() => {
        if (updatedList === true) {
            sliderRef.current.swiper.slideTo(0)
        }
    }, [updatedList])
    // switches the index to 0 everytime the list gets populated
    // used to fix a bug where the index used to remain even when the user searched for a new term



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
                    // current key 
                    // Imtiaz key #1
                    'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    'x-rapidapi-key': 'cd2f669506mshbacf9d2b7d2169ep15ef89jsnb7d5c64abf1d'

                    // additional keys

                    // Imtiaz key#2
                    // 'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    // 'x-rapidapi-key': 'cd74434576msh2f5cc3adcc9d925p11959ejsnfe4483674b62' 
                }
            }).then((response) => {
                // setErrorPage(false)
                setSongList(response.data.tracks.hits);
                setUpdatedList(true); // has to be set after the songList since this is an async event
                setPageChange(true);
            }).catch(function (error) {
                setSearchTerm("");
                // setErrorPage(true);
                toast("Please Enter A Valid Input");

            });

        }

    }, [pageIndex, searchTerm, setSearchTerm])

    

    return (


        <div>
            <Toaster
                // react hot toast notification  
                position="top-center"
                toastOptions={{
                    duration: 1500,
                    style: {
                        margin: '250px 0 0 0',
                        background: '#4169e1',
                        color: '#FFFFFF',
                    },

                }}
            />

            {user ?
                <form className="searchBar" onSubmit={handleSubmit}>
                    <TextField label="Search" onChange={handleChange} value={userInput} inputProps={inputProps} />
                    <button> Search </button>
                </form>
                // if user logged in then enables the search input, otherwise null

                :

                null
            }

            {searchTerm ?
                <>
                    <div className="mySwiper wrapper">

                        <Swiper
                            navigation
                            ref={sliderRef}
                            effect={"coverflow"}
                            grabCursor={true}
                            onSlideChange={(e) => setCoverflowIndex(e.activeIndex)}
                            spaceBetween={50}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}

                            pagination={{
                                clickable: true,
                            }}

                        >


                            <div className="coverFlow">
                                {songList.map((song, index) => {
                                    song.track.index = index; // putting trackIndex on to the song object
                                    return (
                                        <SwiperSlide key={song.track.key}>
                                            <div className="artContainer" key={song.track.key}>
                                                <img src={song.track.images.coverart} alt={`Coverart of ${song.track.title}`} onClick={() => handlePlayPause(song.track)} />
                                                <h3>{song.track.title}<span><button onClick={() => handleLiked()}>{liked ? <IoMdHeartEmpty /> : <IoMdHeart />}</button></span></h3>
                                                <h4>{song.track.subtitle}</h4>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                }

                            </div>

                        </Swiper>

                    </div>

                    <Pages pageIndex={pageIndex} setPageIndex={setPageIndex} sliderRef={sliderRef} coverflowIndex={coverflowIndex} setCoverflowIndex={setCoverflowIndex} songList={songList} updatedList={updatedList} pageChange={pageChange} setPageChange={setPageChange} />
                </>
                :


                <div className="tagLine">
                    <h1><span>Amplify</span>Your Music</h1>
                    <p>Expand your musical horizon</p>
                    {!user ?
                        <button onClick={() => setShowModal(true)}>Get Started</button>
                        :
                        null
                    }
                </div>
                // if searchTerm doesn't exist then displays a different landing page

            }


            {currentTrack ? <PlayMusic currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} playPause={playPause} setPlayPause={setPlayPause} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} setUpdatedList={setUpdatedList} updatedList={updatedList} updatedPage={updatedPage} setUpdatedPage={setUpdatedPage} searchTerm={searchTerm} user={user} stopMusic={stopMusic} coverflowIndex={coverflowIndex} setCoverflowIndex={setCoverflowIndex} sliderRef={sliderRef} /> : null}
            {/* if current track exists then pass values into playMusic component. Otherwise return null */}

        </div>

    )


}

export default GetMusic;
