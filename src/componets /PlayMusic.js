import { useEffect, useRef} from "react"

const PlayMusic = ({currentTrack, playPause, toggle}) => {

    const audioElement = new Audio();

    // audioElement.preload = "none";


    const audioRef = useRef(audioElement);

    // console.log(currentTrack);

    
    useEffect( () => {
        
        const currentSong = currentTrack.hub.actions[1].uri;

        if (playPause === false && audioRef.current.currentTime === 0) {
            audioRef.current.src = currentSong;
            audioRef.current.play();
            // console.log(audioRef.current.currentTime);
            // console.log(currentTrack.hub.actions[1]);
            console.log(playPause);


        } else if (audioRef.current.src !== currentSong) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentSong;
            audioRef.current.play();
            console.log(playPause);
            
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            audioRef.current.pause();
            console.log(audioRef.current.currentTime);
            console.log(playPause);
        } else {
            audioRef.current.play();
            console.log(playPause);
        }
    }, [toggle, currentTrack, playPause]);

    // useEffect(() => {
    //     if (isPlaying) {
    //         audioRef.current.play();
    //     } else {
    //         audioRef.current.pause();
    //     }
    // }, [isPlaying]);

   

    // console.log(audioElement)

    return (
        <>
            {/* <audio src={props.currentTrack} autoPlay controls />    */}
        </>
    )
}

export default PlayMusic;