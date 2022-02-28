import { useCallback, useEffect, useRef} from "react"
import MediaPlayer from "./MediaPlayer";

const PlayMusic = ({ currentTrack, setCurrentTrack, playPause, setPlayPause, toggle, setToggle, songList, pageIndex, setPageIndex, submitToggle, setSubmitToggle}) => {

    const audioElement = new Audio();
    const audioRef = useRef(audioElement);

    
    useEffect( () => {
        setSubmitToggle(true)
        const currentSong = currentTrack.hub.actions[1].uri;

        if (playPause === false && audioRef.current.currentTime === 0) {
            audioRef.current.src = currentSong;
            audioRef.current.play();
            console.log(playPause)

        } else if (audioRef.current.src !== currentSong) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentSong;
            audioRef.current.play();
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            audioRef.current.pause();
            console.log(audioRef.current.currentTime);
        } else {
            audioRef.current.play();
        }
    }, [currentTrack, playPause]);

    useEffect( () => {
        
        // if page index is greater than 0 && currentTrack.index == 0 && previous is clicked then we want to go to previous songList and setCurrentTrack to songList[4].track

        // if (pageIndex !== 0 && currentTrack.index === 0) {

        // }
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

    return (
        <>
            <MediaPlayer audioRef={audioRef} playPause={playPause} setPlayPause={setPlayPause} toggle={toggle} setToggle={setToggle} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </>
    )
}

export default PlayMusic;