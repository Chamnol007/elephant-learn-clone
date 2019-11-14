import _ from 'lodash';

export const getPendingComment = (newComments, oldComments) => {
  return change(newComments, oldComments);
};

const change = (newComments, oldComments) => {
  return _.transform(newComments, (result, value, key) => {
    if (!oldComments[key]) {
      result[key] = value;
    }
  });
};

export const mapCommentsList = (newComments, oldComments) => {
  const oldCommentMap = _.map(oldComments, value => {
    return {
      ...value,
      status: 'old'
    };
  });
  const newCommentMap = _.map(newComments, value => {
    return {
      ...value,
      status: 'pending'
    };
  });
  const comments = _.concat(newCommentMap, oldCommentMap);
  return _.filter(comments, val => !_.isEmpty(val.content));
};
