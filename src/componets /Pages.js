import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

const Pages = ({ pageIndex, setPageIndex, sliderRef, songList }) => {

    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        // this is disables the previous page button when the user is at the first page index
        if(pageIndex === 0){
            setDisabled(true);
        } else if (pageIndex > 0) {
            setDisabled(false);
        }
    }, [pageIndex])

    const nextPage = () => {
        setPageIndex(pageIndex + 5);
        setTimeout( ()=> {
            sliderRef.current.swiper.slideTo(0);
        },[1200])
    
    }
    
    const prevPage = () => {
        setPageIndex(pageIndex - 5);
        setTimeout( ()=> {
            sliderRef.current.swiper.slideTo(songList.length);
        },[1200])
    
    }
    return (
        <section>
            <div className="pagesBtnContainer wrapper">
                {!disabled ? 
                    <button 
                    onClick={prevPage}
                    >
                
                        <BsFillArrowLeftCircleFill />
                    
                
                    </button>
                    :
                    <button
                       className="disabledBtn"
                    >

                        <BsFillArrowLeftCircleFill />


                    </button>

                }
                <button className="pageNext" onClick={nextPage}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>
        </section>
    )
}

export default Pages;