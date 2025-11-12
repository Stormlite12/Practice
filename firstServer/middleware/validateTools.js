module.exports=(req,res,next)=>{
    if(req.method==='POST' || req.method==='PUT'){
        const {title,completed}=req.body;

        if(title==undefined && completed==undefined){
            return res.status(400).json({error:"Empty Request"});
        }

        if(title !== undefined){
            if(typeof title !== "string" || title.trim() === ""){
                return res.status(400).json({Error:"Title must be a non-empty string"});
            }
        }

        if(completed!== undefined){
            if(typeof completed !== "boolean"){
                return res.status(400).json({Error:"Not boolean"});
            } 
        }
    }   
    next();
};