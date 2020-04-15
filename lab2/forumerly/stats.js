const mongo = require('./db')
const ObjectID = require('mongodb').ObjectID
const moment = require('moment-timezone')


// Formats all the dates inside of a single object (the object being a single thread)
function registerVisit(useragent) {

  mongo.db.collection('clients')
  .insert({
    os: useragent.getOS()
  },(err, result) => {
    if (err) {return done(err)}
    console.log('The client OS: ', useragent.getOS(), ' is registered')
  })
}

function getStats(cb){
  
  mongo.db.collection("clients").mapReduce(function(){
    emit(this.os.name, 1)
  }, function(key, values) {return Array.sum(values)}, {
    query: {},
    out: "clients_by_os"
  }, (err, res) => {
    if(res){
      res.find({}, (err, docs) => {
        docs.toArray().then(r => cb(r))
      } )
    }
  })
}

module.exports = {
  registerVisit,
  getStats
}