import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions'
import QualityBtn from './QualityBtn.jsx';
import $ from 'jquery';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.review.date).toDateString();
    this.user_since = new Date(this.props.review.user_yelping_since).toDateString();
    this.hearts = [];
    for (var i = 0; i < this.props.review.stars; i++) {
      this.hearts.push(i);
    }
  }
  componentDidMount() {
    if (!this.props.review.user_pic) {
      console.log('fetch');
      this.props.fetchUserData(this.props.review.user_id);
    } else {
      console.log('dont fetch');
    }
    if (this.props.params.q) {
      var regex = new RegExp(this.props.params.q, 'gi');
      //`<strong></strong>`
      // $('.review-text').html($('.review-text').text().replace(regex, word => {
      //   console.log(word);
      //   return `<strong>${word}</strong>`;
      // }));
    }
  }
  render() {
    return (
      <div className="review-container">
        <div className="user">
          <div className="user-info">
            <div className="user-picture">
              <div className="user-pic"
                style={this.props.userData.data[this.props.review.user_id] ?
                  {backgroundImage: "url(" + this.props.userData.data[this.props.review.user_id].url + ")"}
                  : {backgroundImage: "url(" + this.props.review.user_pic + ")"}}></div>
              <div className="user-since">
                Chomper since:<br />{this.user_since}
              </div>
            </div>
            <div className="user-stats">
              <div className="user-name">
                <a className="user-link" href={'https://www.yelp.com/user_details?userid='
                  + this.props.review.user_id}>{this.props.review.user_name}</a>
              </div>
              <div className="user-reviewcount">
                Reviews: {this.props.review.user_reviewcount}
              </div>
              <div className="user-avgstars">
                Avg Stars: {this.props.review.user_average_stars}
              </div>
              <div className="user-fans">
                Fans: {this.props.review.user_fans}
              </div>
              <div className="user-useful">
                Useful: {this.props.review.user_useful}
              </div>
              <div className="user-funny">
                Funny: {this.props.review.user_funny}
              </div>
              <div className="user-cool">
                Cool: {this.props.review.user_cool}
              </div>
            </div>
          </div>
          <div>
            mouseover stuff
          </div>
        </div>
        <div className="review">
          <div className="review-header">
            <div className="review-hearts">
              {this.hearts.map((star, i) => <div key={i} className="review-heart"></div>)}
            </div>
            <div className="review-date">
              {this.date}
            </div>
          </div>
          <div className="review-text">
            {this.props.review.text}
          </div>
          <div className="review-qualities">
            <QualityBtn quality={['Useful', this.props.review.useful]} />
            <QualityBtn quality={['Funny', this.props.review.funny]} />
            <QualityBtn quality={['Cool', this.props.review.cool]} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    params: state.params,
    userData: state.userData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (id) => {
      dispatch(fetchUserData(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);