import { useState, useEffect } from "react";

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
        <>
        <button 
        onClick={()=> setPageIndex(pageIndex - 5)}
        disabled={disabled}>
            {"<"}
        </button>
        <button onClick={() => setPageIndex(pageIndex + 5)}>
            {">"}
        </button>
        </>
    )
}

export default Pages;