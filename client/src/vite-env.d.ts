/// <reference types="vite/client" />

interface CommentType{
    createdAt:string,
    description:string,
    id:number,
    user:{username:string,profile:string},
    userId:number
}
type LikeType={
    action:string,
    data:{

        userId:number,
        videoId:number
    }

}