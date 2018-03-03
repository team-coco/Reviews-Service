import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../actions'
import Review from './Review.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchReviews(this.props.params.id);
  }
  render() {
    return (
      <div>
        {this.props.reviews.data.reviews ?
          this.props.reviews.data.reviews.map((review, i) =>
          <Review key={i} review={review} />) : 'loading'}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.params,
    reviews: state.reviews
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviews: (id) => {
      dispatch(fetchReviews(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);