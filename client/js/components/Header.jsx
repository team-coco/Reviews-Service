import React from 'react';
import { connect } from 'react-redux';

const Header = ({reviews, fetchData }) => (
  <div className="header">
    <span className="yellow">Recommended Reviews</span> for {reviews.data.name}
  </div>
);

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'SHOW_ALL':
//       return todos;
//     case 'SHOW_COMPLETED':
//       return todos.filter(
//           t => t.completed
//       );
//     case 'SHOW_ACTIVE':
//       return todos.filter(
//           t => !t.completed
//       );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     todos: getVisibleTodos(
//       state.todos,
//       state.visibilityFilter
//     )
//   };
// };
function mapStateToProps (state) {
  return {
    reviews: state.reviews
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);