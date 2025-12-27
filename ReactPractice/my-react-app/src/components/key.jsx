import React from "react";


function List (){
    const arr = [1,2,3,5];

    return (
        <>
            <ul>
                {arr.map((id)=>{
                   return <li key={id}>{id}</li>
                })}
            </ul>
        </>
    );
}

export default List;