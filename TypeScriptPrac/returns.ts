type Product = {
    id: number,
    price : number,
};


function createProduct(id: number , price : number) : Product {
    return {id , price};
}

const product  = createProduct(23,246);

console.log(product);