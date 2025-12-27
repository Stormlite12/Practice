const { createElement } = require("react")

const react = { 
    add : function(values){
        const element = document.createElement("div");
        let num =0;
        
        if(Array.isArray(values)){
            for(let value of values){
                num+=value;
            }

            element.append(num);
        }
       
        
        return element; 
    }
}

const sum = react.add([12,34,45]);

const root = document.getElementById('root');
root.append(sum);