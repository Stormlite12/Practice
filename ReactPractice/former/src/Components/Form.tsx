import { useState } from "react";

function Form(){

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");

    const [errors,setErrors] = useState<({fields: string, email: string , name: string, number:string})>({
        fields: "",
        email: "",
        name: "",
        number: ""
    })


    function handleSubmit(e : React.FormEvent){

        e.preventDefault();

        setErrors({
            fields: "",
            email: "",
            name: "",
            number: ""
        })

        if(!email || !name || !number){
            setErrors((prev)=>({...prev,fields:"All fields are required"}));
            return;
        }

        if(!email.includes("@")){
            setErrors((prev)=>({...prev,email:"Email must have @"}));
            return;
        }

        const cleanNumber = number.replace(/\D/g,"");

        if(cleanNumber.length !==10){
            setErrors((prev)=>({...prev, number :"number must have 10 digits"}));
            return;
        }
        

        console.log("Form submitted");
    }
    
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <br/>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <br/>

            {errors.fields && <p style={{color:"red"}}>{errors.fields}</p>}
            {errors.number && <p style={{color:"red"}}>{errors.number}</p>}
            {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
            <input type="tel" placeholder="" value={number} onChange={(e)=>setNumber(e.target.value)} />
            <button type="submit">Submit</button>
             </form>
        </div>

    )
}


export default Form;