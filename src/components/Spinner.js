import React from 'react';
import spin from './spin.gif'

const Spinner = () => {
    return(
        <>
        <div className="text-center">
           <img src={spin} alt='loading'></img>
        </div>
        </>
    ) 
    }
export default Spinner;