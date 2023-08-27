import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  const { users } = useSelector((state) => state.users);

  const author = users.find((user) => user.id === userId);

  // console.log("existAuthor is :", author);

  return <div>By {author ? author.name : "Unknown user"}</div>;
};

export default PostAuthor;
