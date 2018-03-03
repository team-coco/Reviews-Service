import axios from 'axios';
export default {
  getReviews: id => {
    return new Promise((resolve, reject) => {
      axios.get(`/reviews/${id}`).then(res => {
        if (res.data) {
          resolve(res.data);
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    })
  },
  getUserData: id => {
    return new Promise((resolve, reject) => {
      axios.get(`/user/${id}`).then(res => {
        if (res.data) {
          resolve(res.data);
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    })
  }
}