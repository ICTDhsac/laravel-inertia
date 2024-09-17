 
export default function Show({post}) {
    return (
        <>
            <div className="text-sm text-slate-600">
                <span>Posted on: </span>
                <span>{new Date(post.created_at).toLocaleTimeString()}</span>
            </div>
            <p className="font-medium">{post.body}</p>
        </>
    );
}
