/* Add all the required libraries*/

const fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    ListingSchema = require('./ListingSchema.js'), 
    config = require('./config');
    

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri);

const mongooseConnection = mongoose.connection;

mongooseConnection.on("connected", function() {
  console.log('"barzungle? we in');
});
mongooseConnection.on("disconnected", function() {
  console.log("see u later");
});
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

const findLibraryWest = function() {
  
  //find each listing with name matching 'library west'
  let query = ListingSchema.findOne({'code' : 'LBW'});
  
  //selecting the 'name' field
  query.select('name');

  query.exec(function (err, ListingSchema) {
    if (err) return handleError(Err);

    console.log('I found %s for ya!', ListingSchema.name);
  });
  
};
const removeCable = function() {

  let query = ListingSchema.deleteOne({'code' : 'CABL'});
  
  //selecting the 'name' field
  query.select('name');

  query.exec(function (err, ListingSchema) {
    if (err) return handleError(Err);

    console.log('I deleted %s for ya!', ListingSchema.name);
  });

};



const updatePhelpsLab = function() {

  let query = {'address' : '701 N Broadway, Sleepy Hollow, NY 10591, United States'};

  let updateFunction = ListingSchema.update(query, {'address' : '1953 Museum Rd, Gainesville, FL 32603, United States'});

  updateFunction.exec(function (err, ListingSchema) {
    if (err) return handleError(Err);
    console.log('I updated %s for ya!', ListingSchema.address)
  })

    /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
};

const retrieveAllListings = function() {
  const config = require('./config');
  const collection = mongooseConnection.collection('listings');
  
  ListingSchema.find({},(function(err, collection) {
      console.log(JSON.stringify(collection, null, 1));
  })
)};
 
findLibraryWest();
removeCable();
updatePhelpsLab();
setTimeout(retrieveAllListings, 3000);