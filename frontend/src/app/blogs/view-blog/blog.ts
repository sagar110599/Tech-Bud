export interface Blog {
    description: string,
    summary: string,
    tags: Array<string>,
    title: string,
    img: {
        data: {
            data: Array<Number>
        }
    }
    _id: string,
    likedBy:Array<String>,
    dislikedBy:Array<String>,

}
