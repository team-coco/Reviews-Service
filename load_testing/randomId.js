var fs = require('fs');
var idList;
//read and manipulate csv into JSON format
fs.readFile('./load_testing/constrainedBizId.csv', 'utf-8', function(err, data) {
    if (err) throw err;
    idList = '[' + data;
    idList[idList.length - 1] = ']'; 
})

module.exports = {
    randomId
};

function randomId() {
    return data[Math.floor(Math.random() * data.length)];
}