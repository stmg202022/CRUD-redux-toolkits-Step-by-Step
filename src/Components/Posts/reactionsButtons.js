import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../../ReduxSlice/Posts/postSlice";

const reactionsEmoji = {
  thumb: "👍",
  wow: "😮",
  heart: "❤️",
};

const ReactionsButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsButtons = Object.entries(reactionsEmoji).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} <span>{post.reactions[name]}</span>
        </button>
      );
    }
  );

  return <div>{reactionsButtons}</div>;
};

export default ReactionsButtons;
