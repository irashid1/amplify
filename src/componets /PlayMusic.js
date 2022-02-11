const PlayMusic = (props) => {
    
    
    console.log(props.currentTrack);
    return (
        <>
            <audio src={props.currentTrack} autoPlay controls />   
        </>
    )
}

export default PlayMusic;