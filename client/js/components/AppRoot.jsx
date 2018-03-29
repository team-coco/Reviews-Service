import React from 'react';
import { Provider } from 'react-redux';

import Header from './Header.jsx';
import SearchAndSort from './SearchAndSort.jsx';
import Reviews from './Reviews.jsx';

// import configureStore from '../store';

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faGratipay} from '@fortawesome/fontawesome-free-brands';
import { faStickyNote, faUser, faSearch, faLightbulb, faSmile, faCubes  } from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add( faStickyNote, faUser, faSearch, faLightbulb, faSmile, faCubes, faGratipay);

// const store = configureStore();

const ReviewsModule = () => (
  <div className="guinzar-reviews-container">
    <Header />
    <SearchAndSort />
    <Reviews />
  </div>
);
export default ReviewsModule;