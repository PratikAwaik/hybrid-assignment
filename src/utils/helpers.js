import treeFlatten from "tree-flatten/build/tree-flatten";

export const getCommentsFlattened = (comments) => {
  const flattened = [];
  comments.forEach((comment) => {
    flattened.push(...treeFlatten(comment, "children"));
  });
  return flattened;
};

export const addLevelToComments = (comments) => {
  comments.forEach((comment, idx) => {
    // top level comment
    if (comment.parent_id === comment.story_id) {
      comment.level = 0;
    }
    // child comment
    else if (comment.parent_id === comments[idx - 1].id) {
      comment.level = comments[idx - 1].level + 1;
    }
  });

  return comments;
};
