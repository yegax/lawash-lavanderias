const express = require('express');

const { db } = require('../models/component');
const router = new express.Router()

// models
const Comment = require(__basedir + '/models/comment')
const Component = require(__basedir + '/models/component')

const DEFAULT_HEROES_PER_PAGE = 10
const DEFAULT_COMMENTS_PER_PAGE = 3

/**
 * Some API endpoints in this application are sorted and paginated. Here, we will go over
 * some details about sorting and paginating the resulting heroes.
 * 
 * In this applicaiton, we sort the heroes in our database based on "name" alphabetically
 * so that top results start with A going all the way to Z. To learn how to use sort in mongoose,
 * please visit their documentation: https://mongoosejs.com/docs/api.html#query_Query-sort
 * 
 * Pagination is used to return parts of the results to the user in series of pages.
 * You can read about pagination in mongodb here: https://docs.mongodb.com/manual/reference/method/cursor.skip/#pagination-example
 * For example imagine that maximum number of items per page is 5 and we have 7 items in
 * our database. As a result, we need to return the first 5 elements in the first page.
 * For the second page, we need to `skip` over the first 5 elements and return the remaining
 * elements (up to a maximum of 5). As a result, our query from the database for paginated
 * results would typically look like this:
 *    const results = await Hero.find({...}).sort({...}).skip((page - 1) * limit).limit(limit)
 * Note: `page` is the page that we want to fetch the results for and `limit` is the maximum
 * number of elements allowed per page. In our previous example, limit was 5.
 * Note: the number of pages can be calculated as `Math.ceil(count / limit)`
 * 
 * In this application, we will use the `DEFAULT_HEROES_PER_PAGE` variable as the maximum 
 * number of items per page for the endpoints
 * that return a list of heroes and `DEFAULT_COMMENTS_PER_PAGE` variable as the maximum 
 * number of items per page for the endpoints that return a list of comments.
 */



// GET /heroes -> gets a list of heroes, sorted and paginated
router.get('/heroes', async (req, res) => {
  // TODO: fill out the code for the endpoint
  const pages = {
    page: parseInt(req.query.page, DEFAULT_HEROES_PER_PAGE) || 0,
    limit: parseInt(req.query.limit, DEFAULT_HEROES_PER_PAGE) || DEFAULT_HEROES_PER_PAGE
  }

Component.find()
  //Sort by "Name" ascending
    .sort({name: 'asc'})
  //Skip count
    .skip(pages.page * pages.limit)
  //Page limit count
    .limit(pages.limit)
    .exec(function (err, doc) {
        if(err) { res.status(500).json(err); return; };
        //res.json(doc);
        res.render('handlebars/dynamic.hbs', {
          components: doc
      })
        console.log("Succesfully loaded 'Heroes' sorted and paginated!")
    });
})

// GET /heroes/:id --> gets a hero by id
router.get('/heroes/:id', async (req, res) => {
  // TODO: fill out the code for the endpoint

  Component.findById(req.params.id, function(err, componentRouter) {
    res.render("home.ejs", {
        components: componentRouter
    })

    // res.render('home.ejs');
    console.log("Succesfully loaded a single 'Hero' specified by its ID!")
  });
})

  // Route for about page.
  router.get('/components', async (req, res) => {
    var perPage = 11
    var page = req.params.page || 1
  
    Component
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, componentRouter) {
          Component.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('components.ejs', {
                  components: componentRouter,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })    
    });



  // Route for about page.
  router.get('/about', async (req, res) => {
    res.render("index.ejs")
  })

  // Route for contact page.
  router.get('/contact', async (req, res) => {
    res.render("contact.ejs")
  })


module.exports = router
