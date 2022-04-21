import { useState, useEffect } from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipForwardCircleFill, BsFillSkipBackwardCircleFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
// import Range from "react-range";


const MediaPlayer = ({ audioRef, playPause, setPlayPause, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex, trackProgress, onScrub, onScrubEnd, duration, setUpdatedPage, nextTrack }) => {

    const [mute, setMute] = useState(false);
    const [velocity, setVelocity] = useState(100);

    const togglePlayPause = () => {
        // control function for the play/pause button
        setPlayPause(!playPause)
        if (playPause === true) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }

    const prevTrack = () => {

        // control function for the previous track button
        if (audioRef.current.currentTime > 2) {
            // if the track has been playing for more than 2 seconds, it will restart the track
            audioRef.current.currentTime = 0;
        } else {
            if (currentTrack.index === 0) {
                // if current track is the first index of the current list, it will go back to the previous list
                setPageIndex(pageIndex - 5);
                setUpdatedPage(true);
            } else {
                // goes back to the previous track index within the same list
                const prev = currentTrack.index - 1;
                setCurrentTrack(songList[prev].track);
                audioRef.current.play();
            }
        }
    }

    const timeCalc = (value) => {
        let seconds = Math.floor(value % 60);
        let minutes = Math.floor((value / 60) % 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        };

        return minutes + ":" + seconds;
    };

    // console.log(duration);
    // console.log(audioRef.current.duration);

    useEffect(() => {
        audioRef.current.volume = velocity / 100;
        // console.log(velocity)

        if (audioRef.current.volume === 0) {
            setMute(true)
        } else {
            setMute(false)
        }

    }, [audioRef, velocity])

    const volumeChange = (event) => {
        setVelocity(event.target.value)
    }

    const muteTrack = () => {
        setMute(!mute)
    }

    useEffect(() => {
        if (mute === true) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = velocity / 100;
        }
    }, [audioRef, mute, velocity])

    return (

        <div className="mediaPlayer">

            <div className="mediaContainerTop">
            <div className="trackInfo">
                <img src={currentTrack.images.coverart} alt={`album cover for ${currentTrack.title}`} />
                <div className="coverArtTitle">
                    <h3>{currentTrack.title}</h3>
                    <h4>{currentTrack.subtitle}</h4>
                </div>
            </div>

            <div className="mediaContainer">
                <div className="mediaButtons">

                    <button onClick={() => prevTrack()}>
                        <BsFillSkipBackwardCircleFill />
                    </button>
                        <button className="playPause" onClick={() => togglePlayPause()}>
                            {playPause ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
                        </button>
                    <button onClick={() => nextTrack()}>
                        <BsFillSkipForwardCircleFill />
                    </button>

                </div>

                <div className="mediaTime">
                    <p>
                        { trackProgress ?
                            timeCalc(trackProgress)
                            :
                            "0:00"
                        }
                    </p>
                    <label className="sr-only" htmlFor="trackScrub">Track Scrub</label>
                    <input className="progress" id="trackScrub" type="range" value={trackProgress} step="1" min="0" max={duration ? duration : `${duration}`} onChange={(event) => onScrub(event.target.value)} defaultValue="0" onMouseUp={onScrubEnd} onKeyUp={onScrubEnd} />
                    <p>
                        {duration ?
                            timeCalc(duration)
                            :
                            "0:00"
                        }
                    </p>
                </div>
            </div>

            <div className="volumeControls">

                {mute ?

                    <button onClick={() => muteTrack()}>
                        <HiVolumeOff />
                    </button>


                    :
                    <button onClick={() => muteTrack()}>
                        <HiVolumeUp />
                    </button>
                }
                <label className="sr-only" htmlFor="volumeInput">Volume</label>
                <input type="range" id="volumeInput" defaultValue="100" step="1" min="0" max="100" onChange={volumeChange} value={mute ? 0 : velocity} />

            </div>
            
            </div>

            <div className="trackTitle">
                <div className="mediaTimeBottom">
                    <p>
                        {trackProgress ?
                            timeCalc(trackProgress)
                            :
                            "0:00"
                        }
                    </p>
                    <label className="sr-only" htmlFor="trackScrub">Track Scrub</label>
                    <input className="progress" id="trackScrub" type="range" value={trackProgress} step="1" min="0" max={duration ? duration : `${duration}`} onChange={(event) => onScrub(event.target.value)} defaultValue="0" onMouseUp={onScrubEnd} onKeyUp={onScrubEnd} />
                    <p>
                        {duration ?
                            timeCalc(duration)
                            :
                            "0:00"
                        }
                    </p>
                </div>

                <p><span>{`${currentTrack.title}`}</span> - {`${currentTrack.subtitle}`}</p>
            </div>
            {/* <Range /> */}
        </div>
    )

}



export default MediaPlayer;