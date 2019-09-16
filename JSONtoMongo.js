'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    ListingSchema = require('./ListingSchema.js'), 
    config = require('./config');


//initial connection to db
mongoose.connect(config.db.uri);

    /* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

var mongooseConnection = mongoose.connection;

mongooseConnection.on("connected", function() {
  console.log('"barzungle? we in');
  fsMainFunction();
});
mongooseConnection.on("disconnected", function() {
  console.log("see u later");
});

var listingData = undefined;
var fsMainFunction = function() {
fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      listingData = JSON.parse(data);
      addListingData();
    }
  });
};

var addListingData = function() {
    ListingSchema.remove({}, function(err) {
        if (err) {
          console.log(err);
        } else {
            console.log("Data is pushed")
            pushData();
        }
    })
}
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

var pushData = function() {
    for (var element in listingData["entries"]) {
      var entry = new ListingSchema(listingData["entries"][element]);

      //save it!
      entry.save(function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log("saved!!")
          }
      });
    };
};


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */