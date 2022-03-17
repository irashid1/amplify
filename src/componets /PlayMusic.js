import { useState, useEffect, useRef} from "react"
import MediaPlayer from "./MediaPlayer";

const PlayMusic = ({ currentTrack, setCurrentTrack, playPause, setPlayPause, songList, pageIndex, setPageIndex, updatedList, setUpdatedList, updatedPage, setUpdatedPage}) => {

    // creating a new audioElement and putting it inside audioRef
    const audioElement = new Audio();
    const audioRef = useRef(audioElement);

    // creating a new intervalRef for timer
    const intervalRef = useRef();

    // states used for the scrubbing functionality of the track
    const [trackProgress, setTrackProgress] = useState(); 

    const [duration, setDuration] = useState();
    
    const startTimer = () => {
        // starts the timer that counts up from 0 to the duration of the track
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // if (audioRef.current.ended) {

            // } else {
            setTrackProgress(audioRef.current.currentTime);
            // }
        }, [1000])

    }

    useEffect( () => {

        setUpdatedList(false); // setting this value to false, allows the user to search and switch pages without any interruption in the current song being played
        setDuration(audioRef.current.duration); // setting the total duration of each track
        const currentSong = currentTrack.hub.actions[1].uri; // link to playing the audio

        if (playPause === false && audioRef.current.currentTime === 0) {
            // when you get to the landing page, if no track is currently playing, this will start playing the first user selected track
            audioRef.current.src = currentSong; 
            audioRef.current.play();
            startTimer();

        } else if (audioRef.current.src !== currentSong) {
            // if the user selects another song, this will start playing the new current track
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentSong;
            audioRef.current.play();
            startTimer();
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            // this pauses the current track, when its currently being played for any duration of time
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        } else {
            // if the song is being paused and the user selects the same track, it will resume from the point the current track was paused at
            audioRef.current.play();
            startTimer();
        }
    }, [currentTrack, playPause, setUpdatedList]);

    useEffect( () => {
        if (updatedList === true && updatedPage === true) {
            // every time songList gets populated, current song being played does not get interrupted
            if (currentTrack.index === (songList.length - 1) && pageIndex >= 0) {
                // if the current track being played is the last index of the list and you want to go to the first index of the next list;
                setCurrentTrack(songList[0].track);
                setUpdatedList(false);
                setUpdatedPage(false);         
            } else if (currentTrack.index === 0 && pageIndex >= 0 && audioRef.current.currentTime !== 0) {
                // if the current track being played is the first index of the list and you want to go to the last index of the previous list
                setCurrentTrack(songList[songList.length - 1].track);
                setUpdatedList(false);
                setUpdatedPage(false);     
            } else if (currentTrack.index < (songList.length - 1) && pageIndex > 0) {
                // *** condition is here to prevent bugs regarding page changing when the song is being played, undesired results occur when we have page change when the first or last index is being played, requires further investigation ***
                setCurrentTrack(songList[0].track);
                setUpdatedList(false);
                setUpdatedPage(false);
            }
        }
        
    }, [currentTrack.index, pageIndex, setCurrentTrack, setUpdatedList, setUpdatedPage, songList, updatedList, updatedPage])

    const onScrub = (value) => {
        // lets the user control which part of the song they want to listen to using a range input
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // once the user lets go of the range input, it will resume playing from that point of the track
        startTimer();
    }

    return (
        <div className="wrapper">
            <MediaPlayer audioRef={audioRef} playPause={playPause} setPlayPause={setPlayPause} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} trackProgress={trackProgress} onScrub={onScrub} onScrubEnd={onScrubEnd} duration={duration} setUpdatedPage={setUpdatedPage}/>
        </div>
    )
}

export default PlayMusic;