const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const JSONStream      = require('JSONStream');
const fs              = require('fs');
const config = require('./config');
 
// where the data will end up
const outputDBConfig = { dbURL: config.mongo_complete , collection: config.mongo_collection };
 
// create the writable stream
const writableStream = streamToMongoDB(outputDBConfig);
 
// create readable stream and consume it
fs.createReadStream(config.json_file)
    .pipe(JSONStream.parse('*'))
    .pipe(writableStream);