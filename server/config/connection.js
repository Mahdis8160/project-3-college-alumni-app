const mongoose = require('mongoose');

mongoose.connect('mongodb://Anubhav:svnit@cluster0-shard-00-00.ojfjb.mongodb.net:27017,cluster0-shard-00-01.ojfjb.mongodb.net:27017,cluster0-shard-00-02.ojfjb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-vyucgy-shard-0&authSource=admin&retryWrites=true&w=majority' || 'mongodb://localhost/easy-rent', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;