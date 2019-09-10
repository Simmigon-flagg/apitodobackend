const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000

// mongoose.connect("mongodb://Contra:Career906@cluster0-x61mi.mongodb.net/test?retryWrites=true&w=majority",{ useMongoClient: true});

//  var db = mongoose.connection;
//  db.on('error', console.error.bind(console, 'connection error:'));
//  db.once('open', function() {
//    // we're connected!
//  });




// mongoose.connect('')

const server = http.createServer(app);
server.listen(PORT)
console.log("The Server is running and listening for request on port " + PORT)
