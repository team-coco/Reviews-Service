export const fetchReviews = id => {
  return {
    type: 'FETCHING_REVIEWS',
    id
  };
};
export const fetchUserData = id => {
  return {
    type: 'FETCHING_USERDATA',
    id
  };
};