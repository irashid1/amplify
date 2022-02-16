import { useEffect, useRef} from "react"

const PlayMusic = ({currentTrack, playPause, toggle}) => {

    const audioElement = new Audio();

    // audioElement.preload = "none";


    const audioRef = useRef(audioElement);

    console.log(audioRef.current);

    
    useEffect( () => {
        
        if (playPause === false && audioRef.current.currentTime === 0) {
            audioRef.current.src = currentTrack;
            audioRef.current.play();
            console.log(audioRef.current.currentTime);
            console.log(currentTrack);


        } else if (audioRef.current.src !== currentTrack) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentTrack;
            audioRef.current.play();
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            audioRef.current.pause();
            console.log(audioRef.current.currentTime);
        } else {
            audioRef.current.play();
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