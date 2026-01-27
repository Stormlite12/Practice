import Card from "./card/Card";
import data from "../data"

export default function Main(){

    const entryElements = data.map((entry)=>{
        return(
            <Card
                img  = {entry.img}
                title = {entry.title}
                country= {entry.country}
                dates = {entry.dates}
                location= {entry.googleMapsLink}
                text = {entry.text}
            />   
        )
    })



    return (
        <>
            <div>{entryElements}</div>
        </>
       
    )
}