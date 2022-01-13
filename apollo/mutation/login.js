import {gql} from '@apollo/client';

export const LOGIN = gql`
mutation login($token: String!){
    login(token:$token)
}
`