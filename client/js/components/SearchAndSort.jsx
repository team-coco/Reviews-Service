import React from 'react';
import { connect } from 'react-redux';

const SearchAndSort = ({ params }) => {
  let input;
  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = event => {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  return (
    <div className="search-sort">
      <div>
        <input className="search-input" ref={node => { input = node; }} />
        <button onClick={() => {
          if (input.value.length) {
            window.location = '/' + params.id + '?q=' + input.value;
          }
          input.value = '';
        }}>
        Search
        </button>
      </div>
      <div>
        <div className="dropdown">
          <button onClick={myFunction} className="dropbtn">Chompy Sort</button>
          <div id="myDropdown" className="dropdown-content">
            <a href={'/' + params.id}>Chompy Sort</a>
            <a href={'/' + params.id + '?sort_by=date_desc'}>Newest First</a>
            <a href={'/' + params.id + '?sort_by=date_asc'}>Oldest First</a>
            <a href={'/' + params.id + '?sort_by=rating_desc'}>Highest Rated</a>
            <a href={'/' + params.id + '?sort_by=rating_asc'}>Lowest Rated</a>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    params: state.params
  };
};
export default connect(mapStateToProps)(SearchAndSort);