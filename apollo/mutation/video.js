import {gql} from '@apollo/client'

export const CREATE_VIDEO = gql `
mutation addVideo($title: String!, $description: String!, $file: Upload!){
    addVideo(video: {
        title: $title,
        description: $description,
        file: $file
    }) {
        title
        description
        url
    }
}
`