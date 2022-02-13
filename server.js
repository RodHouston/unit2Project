//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const UserModel = require('./models/user.js')
const UserSeed = require('./models/userSeed.js')

const PostModel = require('./models/postModel.js')
const PostSeed = require('./models/postSeed.js')
//
// //===========for image upload
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// require('dotenv/config');
// // Set EJS as templating engine
// app.set("view engine", "ejs");
// const multer = require('multer');
//
// // mongoose.connect(process.env.MONGO_URL,
// //     { useNewUrlParser: true, useUnifiedTopology: true }, err => {
// //         console.log('connected')
// //     });
//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//
// const upload = multer({ storage: storage });
// const ImageModel = require('./models/imageModel.js');
//
//
//
// app.get('/uploadImage', (req, res) => {
//     ImageModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             console.log('in here err');
//             res.status(500).send('An error occurred', err);
//         }
//         else {console.log('in here 1');
//             res.render('imageUpload.ejs', { items: items });
//         }
//     });
// });
//
// app.post('/', upload.single('image'), (req, res, next) => {
//
//         console.log(__dirname );
//     console.log('in here 2');
//     const obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: "fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename))",
//             contentType: 'image/png'
//         }
//     }
//     ImageModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });
//
// app.get('/gallery' , (req, res) => {
//     ImageModel.find({}, (err, imgs) => {
//
//
//     res.render('gallery.ejs', {images: imgs});
//     })
// });
//
//
// //======================================================

require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000


 //===========================================================================
//==============*** SEEDS ****=================================
// UserModel.create( UserSeed, ( err , data ) => {
//       if ( err ) console.log ( err.message )
//   console.log( "added  data" )
//   }
// );
 // PostModel.create( PostSeed, ( err , data ) => {
 //       if ( err ) console.log ( err.message )
 //   console.log( "added  data" )
 //   }
 // );


 //===========================================================================
//=============Creates new user send here from login page(/)
app.post('/newUser', (req, res) => {
    UserModel.create(req.body), (err, createdUser) => {
        res.send(req.body);
    }
    res.redirect('/');
})
app.get('/newUser' , (req, res) => {
    res.render('newUser.ejs');
});


//===========================================================================
//=============Login Page.======================================
app.get('/' , (req, res) => {
    res.render('login.ejs');
});


//===========================================================================
//============== loads profile page with info found from first name key
app.get('/profile/:firstName' , (req, res) => {
    PostModel.find({author: req.params.firstName}, (err, userPost) => {

        UserModel.find({}, (err, allUsers) => {
            UserModel.find({firstName: req.params.firstName}, (err, user) => {
                res.render('profile.ejs', {data: user, post:userPost, allUsers:allUsers});
            })
        })
    }).sort({"_id": -1})
});


//===========================================================================
// =============photo gallery page
app.get('/gallery' , (req, res) => {
    res.render('gallery.ejs');
});


//===========================================================================
//====WORKING ON EDIT FEATURE ==========
//sent here from edit page. puts info into database and redirect back to
app.get('/edit/:firstName/edit', (req, res) => {
    UserModel.find({firstName: req.params.firstName}, (err, user) => {
        res.render('update.ejs', {
            data: user
        });
    });
});

app.put('/edit/:firstName', (req, res) => {
    // console.log(res);
    UserModel.findOneAndUpdate({firstName: req.params.subject}, req.body, {new: true}, (err, data) => {
        res.redirect('/profile/firstName');
    });
});


//===========================================================================
//==== Creates new post. =======
app.get('/newPost/:firstName/newPost', (req, res) => {

    UserModel.find({firstName: req.params.firstName}, (err, user) => {
        res.render('postPage.ejs', {
            data: user
        });
    });
});

app.post('/newPost/:firstName', (req, res) => {
    console.log(req)
    PostModel.create(req.body), (err, createdPost) => {
        res.send(req.body);
    }
    PostModel.find({author: req.params.firstName}, (err, userPost) => {
        UserModel.find({}, (err, allUsers) => {
            UserModel.find({firstName: req.params.firstName}, (err, user) => {
                res.render('profile.ejs', {data: user, post:userPost, allUsers:allUsers});
            })
        })
    })
})





//
// app.get('/profile/:name', (req, res) => {
//     PokemonModel.find({name: req.params.name}, (err, pokemon) => {
//         PokemonModel.find({}, (err, allPokemon) => {
//             res.render('show.ejs', { data: pokemon, all: allPokemon }
//         );
//         })
//     })
// })
// app.put('/pokemon/:name', (req, res) => {
//     PokemonModel.findOneAndUpdate({
//         name: req.params.name
//     }, req.body, {
//         new: true
//     }, (err, data) => {
//         res.redirect('/index');
//     });
// });

// app.delete('/pokemon/:name', (req, res) => {
//     PokemonModel.findOneAndDelete({
//         name: req.params.name
//     }, (err, foundPokemon) => {
//         res.redirect('/index')
//     });
// });

// app.get('/pokemon/new', (req, res) => {
//     res.render('new.ejs');
// })




// app.get('/index', (req, res) => {
//     PokemonModel.find({}, (err, allPokemon) => {
//         res.render(
//             'index.ejs', {
//                 data: allPokemon
//             }
//         )
//     }).sort({
//         "id": 1
//     })
// })




UserModel.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} in this database` );
});









//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
