import React from 'react';
import { Provider } from 'react-redux';

import Header from './Header.jsx';
import Reviews from './Reviews.jsx';
import SearchAndSort from './SearchAndSort.jsx';

// import configureStore from '../store';

import { library } from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGratipay from '@fortawesome/fontawesome-free-brands/faGratipay';
// import { faStickyNote, faUser, faSearch, faLightbulb, faSmile, faCubes  } from '@fortawesome/fontawesome-free-solid';
import faStickyNote from '@fortawesome/fontawesome-free-solid/faStickyNote';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faLightbulb from '@fortawesome/fontawesome-free-solid/faLightbulb';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import faCubes from '@fortawesome/fontawesome-free-solid/faCubes';
library.add( faStickyNote, faUser, faSearch, faLightbulb, faSmile, faCubes, faGratipay);


const ReviewsModule = () => (
  <div className="guinzar-reviews-container">
    <Header />
    <SearchAndSort />
    <Reviews />
  </div>
);
export default ReviewsModule;