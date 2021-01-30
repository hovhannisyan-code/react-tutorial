import avatar from '../avatar.png';

function Comments() {
    const comment = "First comment by author";
    return (
        <div className="coment">
            <div className="author">
                <img src={avatar} className="avatar" alt="Avatar" />
                <p className="comment-text">{comment}</p>
            </div>
        </div>
    )
}
export default Comments;