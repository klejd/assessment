const {nutritions} = require("./fakeData");
console.log(nutritions);
const resolvers = {

    Query:{
        getAllData(){
            return nutritions;
        }
        
    },
    
    Mutation:{
        createProduct(parent,args){ //to learn => 4 different arguments that we get from request
            const newProduct = args; 
            nutritions.push(newProduct); //instead db statement
             return newProduct;
        },
        deleteProduct:(parent,args)=>{
            const removeProduct = Object.assign({},args)
            delete removeProduct[args];
           const final =nutritions.filter(a=>a.dessert!==removeProduct.dessert)
            console.log(final);
            return removeProduct;
        //   const a=  nutritions.filter(a=>a.dessert!==dessert)
        //   console.log(a);
        //   return a;
            }
        }
    }

module.exports ={resolvers};