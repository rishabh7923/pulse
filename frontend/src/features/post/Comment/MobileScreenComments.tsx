import AddComment from "./AddComment"
import Comment from "./Comment"


function MobileScreenComments() {
    return (
        <div className="my-4"> 
            <AddComment/>
            <ul className="divide-y px-2">
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </ul>
        </div>
    )
}

export default MobileScreenComments