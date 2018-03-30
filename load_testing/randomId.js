
//read and manipulate csv into JSON format
var max = 10000000

module.exports = {
    randomId
};

function randomId(userContext, events, done) {
    userContext.vars.business_id = Math.floor(Math.random() * max);
    return done();
}