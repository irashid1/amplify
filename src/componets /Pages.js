import { useState, useEffect } from "react";

const Pages = ({ pageIndex, setPageIndex }) => {

    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        if(pageIndex === 0){
            setDisabled(true);
        } else if (pageIndex > 0) {
            setDisabled(false);
        }
    })

    return (
        <>
        <button 
        onClick={()=> setPageIndex(pageIndex-1)}
        disabled={disabled}>
            {"<"}
        </button>
        <button onClick={() => setPageIndex(pageIndex + 1)}>
            {">"}
        </button>
        </>
    )
}

export default Pages;