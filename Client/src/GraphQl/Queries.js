import {gql} from '@apollo/client';

export const Load_Data = gql`
    query{
        getAllData{
            dessert
              fat
              carb
              protein
              calories
            }
    }
`