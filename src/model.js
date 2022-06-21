const mongoose = require('mongoose');

const crawlSchema = new mongoose.Schema({ url: {type: 'string'}, title: {type: 'string'}, links: {type: ['string']}, html: {type: 'string'} });

const Crawl = mongoose.model('Crawl', crawlSchema);

module.exports =  Crawl;