const {gql} = require("apollo-server-express");
const typeDefs = gql`
type Data {
    dessert: String!
        calories :Int
        fat: Int
        carb: Int
        protein:Int
}
#queries
type Query{
    getAllData:[Data!]
    
}
#mutations
type Mutation{
    createProduct(dessert:String!,calories:Int,fat:Int,carb:Int,protein:Int):Data
    deleteProduct(dessert:String):Data
    #to return a product (to do: fix delete)
}
`; 
module.exports= {typeDefs};