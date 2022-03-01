import { useState, useEffect, useRef} from "react"
import MediaPlayer from "./MediaPlayer";

const PlayMusic = ({ currentTrack, setCurrentTrack, playPause, setPlayPause, toggle, setToggle, songList, pageIndex, setPageIndex, submitToggle, setSubmitToggle}) => {

    const audioElement = new Audio();
    const audioRef = useRef(audioElement);

    const intervalRef = useRef();

    const [trackProgress, setTrackProgress] = useState(); 

    const [duration, setDuration] = useState();
    
    useEffect( () => {
        setSubmitToggle(true);
        setDuration(audioRef.current.duration)
        const currentSong = currentTrack.hub.actions[1].uri;

        if (playPause === false && audioRef.current.currentTime === 0) {
            audioRef.current.src = currentSong;
            audioRef.current.play();
            startTimer();

        } else if (audioRef.current.src !== currentSong) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentSong;
            audioRef.current.play();
            startTimer();
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        } else {
            audioRef.current.play();
            startTimer();
        }
    }, [currentTrack, playPause]);

    console.log(trackProgress);
    console.log(audioRef.current.duration);

    useEffect( () => {
        
        if (submitToggle === true) {
            if (currentTrack.index === (songList.length - 1) && pageIndex >= 0) {
                setCurrentTrack(songList[0].track)
            } else if (currentTrack.index === 0 && pageIndex >= 0 && audioRef.current.currentTime !== 0) {
                setCurrentTrack(songList[songList.length - 1].track)
            } else if (currentTrack.index < (songList.length - 1) && pageIndex > 0) {
                setCurrentTrack(songList[0].track)
            }
        }
        
    }, [songList])

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // if (audioRef.current.ended) {
                
            // } else {
                setTrackProgress(audioRef.current.currentTime);
            // }
        }, [1000])

    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        startTimer();
    }

    return (
        <>
            <MediaPlayer audioRef={audioRef} playPause={playPause} setPlayPause={setPlayPause} toggle={toggle} setToggle={setToggle} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} trackProgress={trackProgress} onScrub={onScrub} onScrubEnd={onScrubEnd} duration={duration} />
        </>
    )
}

export default PlayMusic;