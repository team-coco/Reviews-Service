import React from 'react';
import { Provider } from 'react-redux';

import Header from './Header.jsx';
import SearchAndSort from './SearchAndSort.jsx';
import Reviews from './Reviews.jsx';

import configureStore from '../store';

const store = configureStore();

const ReviewsModule = () => (
  <div className="reviews-container">
    <Header />
    <SearchAndSort />
    <Reviews />
  </div>
);
export default (
  <Provider store={store}>
    <ReviewsModule />
  </Provider>
)