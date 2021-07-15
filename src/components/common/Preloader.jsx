import React from "react";
import loading from "../../assets/images/loading.gif"

const Preloader = (props) => {
    return <div style={ {backgroundColor: "white"} }>
        <img src={loading}/>
    </div>
}

export default Preloader;