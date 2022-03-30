import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

const Pages = ({ pageIndex, setPageIndex }) => {

    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        // this is disables the previous page button when the user is at the first page index
        if(pageIndex === 0){
            setDisabled(true);
        } else if (pageIndex > 0) {
            setDisabled(false);
        }
    }, [pageIndex])

    return (
        <section>
            <div className="pagesBtnContainer">
                {!disabled ? 
                    <button 
                    onClick={()=> setPageIndex(pageIndex - 5)}
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
                <button className="pageNext" onClick={() => setPageIndex(pageIndex + 5)}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>
        </section>
    )
}

export default Pages;