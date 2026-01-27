type Props = {
    img :{
        src : string, 
        alt : string
    },
    location: string,
    title : string,
    country: string,
    dates: string,
    text : string
}


export default function Card(props:Props) {
    return (
        <main>
            <div className="card">

                <div className="img"><img src={props.img.src} alt={props.img.alt} /></div>

                <div className="card-text">
                    <div className="location">{props.country} <span><a href={props.location}> View on Google Maps</a></span></div>
                    <div className="title">{props.title}</div>
                    <div className="date">{props.dates}</div>
                    <div className="desc">{props.text}
                    </div>
                </div>
            </div>
        </main>
    )
}