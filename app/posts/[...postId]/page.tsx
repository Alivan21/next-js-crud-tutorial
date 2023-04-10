function PostDetail({ params }: { params: { postId: string } }) {
  return <div>Post {params.postId}</div>;
}

export default PostDetail;
