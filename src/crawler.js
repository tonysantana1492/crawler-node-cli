const urlParser = require("url");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
let count = 0;
const crawlModel = require("./model");
const mongoose = require("mongoose");

const seenUrls = {};

const getUrl = (link, host, protocol) => {
  if (link.includes("http") || link.includes("https")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const search = async ({ url, count, maxdist }) => {
  if (seenUrls[url]) return;

  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url).catch((error) => {
    console.log(`Not Reachable: ${url}`);
  });

  if (!response) {
    //console.log('MaxDist Reach');
    return;
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $("title").text();

  const links = $("a")
    .map((i, link) => link.attribs.href)
    .get();
   
/*
  const html = await response.text();
  const data = extractor(html);
  const title = data.title;
  const links = data.links;*/

  const content = { url: url, title: title, links: links, html: html };

  const page = await crawlModel.findOne({url: url });

  if (page == null) {
    try {
      const newUrl = new crawlModel(content);
      await newUrl.save();      
      console.log(`Crawled: ${url}`);
    } catch (e) {
      console.log(e);
    }
  }else{
    console.log(`Already Crawled: ${url}`);
  }

  count++;
  if (count > maxdist) {
    process.exit;
    return;}

  links.forEach((link) => {
    search({
      url: getUrl(link, host, protocol),
      count: count,
      maxdist: maxdist
    });

  });
};

const initSearch = ({ url, maxdist, db }) => {
  mongoose.connect(`mongodb://localhost:27017/${db}`);

  const dbC = mongoose.connection;
  dbC.on("error", console.error.bind(console, "Error de conexión: "));
  dbC.once("open", () => {
    console.log("Conexión exitosa");
  });
  search({ url, count, maxdist});  
};

module.exports = initSearch;
