

type Props ={
    name : string,
    age? : number
}


function Profile({name , age} : Props){
    return (
        <div>
            <h1>{name}</h1>
            <h2>{age}</h2>
        </div>
    )
}

export default Profile;