var MongoClient = require('mongodb').MongoClient ,
assert = require('assert');
// connection url
var url = 'mongodb://localhost:27017/mongocrud';
// use connect method to connect to the server
MongoClient.connect(url, function(err,db){
	assert.equal(null,err);
	console.log("Connected correctly to server");
	
	insertDocuments(db,function(){
		updateDocument(db,function(){
			deleteDocument(db,function(){
				findDocuments(db,function(){
	db.close();
				});// end find all docs method
			});// end delete doc method
		});// end update doc method
	});// end insert doc method
	});
	// insert documents method
	// add the call insertDocuments command to the MongoClient.connect method callback
var insertDocuments = function(db,callback){
	// get the documents collection
	var collection = db.collection('documents');
	// insert some documents
	collection.insertMany([{a:1},{a:2},{a:3}]
	,function(err,result){
		// the parameter result contsains the result document from MongoDB
		// ops- contains the documents inserted with added _id fields
		// connection-contains the connection used to perform the insert
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
		});
	}	
		// update document method
	var updateDocument = function(db,callback){
		// get the documents collection
		var collection = db.collection('documents');
		// update document where a is 2, set b equal to one
		collection.updateOne({a:2},{$set:{b:1}},function(err,result){
			assert.equal(err,null);
			assert.equal(1,result.result.n);
			console.log("Updated the document with the field a equal to 2");
			callback(result);
			});	
		}	
		// delete document method
		var deleteDocument = function(db,callback){
			// get the documents collection
			var collection = db.collection('documents');
			// remove a document
			collection.deleteOne({a:3},function(err,result){
				assert.equal(err,null);
				assert.equal(1,result.result.n);
				console.log("Removed the document with the field a equal to 3");
				callback(result);
				
				});
			}
			// find all documents method
			var findDocuments = function(db,callback){
				// get the documents collection
				var collection = db.collection('documents');
				// find all documents
				collection.find({}).toArray(function(err,docs){
					assert.equal(err,null);
					assert.equal(2,docs.length);
					console.log("Found the following records");
					console.dir(docs);
					callback(docs);
					});
				}
