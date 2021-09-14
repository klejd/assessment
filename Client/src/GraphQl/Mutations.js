import {gql} from '@apollo/client';
export const CREATE_PRODUCT =gql`
mutation createProduct(
    $dessert:String!,
    $calories:Int,
    $fat:Int,
    $carb:Int,
    $protein:Int
    ){
        createProduct(
            dessert:$dessert,
            calories:$calories,
            fat:$fat,
            carb:$carb,
            protein:$protein
            ){
                dessert
                calories
                fat
                carb
                protein
            }

        
    
}
`
export const remove_Product = gql`
mutation deleteProduct(
    $dessert:String!
){
deleteProduct(dessert:$dessert)
}
`

export const remove_mutation = gql`
mutation ($dessert: String) {
    deleteProduct (
      where: {
        dessert: {
          dessert: $dessert
        }
      }
    ) {
      affected_rows
    }
  }
`