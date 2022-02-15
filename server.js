//___________________
//Dependencies
//___________________
const express = require('express'),
bodyParser = require("body-parser"),
fs = require("fs"),
multer = require("multer")

;
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const UserModel = require('./models/user.js')
const UserSeed = require('./models/userSeed.js')

const PostModel = require('./models/postModel.js')
const PostSeed = require('./models/postSeed.js')
//

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

 // //===========for image upload==================
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 app.use(express.static(__dirname));
const path = require('path');
 const Image = require('./models/imageModel.js')

 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "./public/photos/uploads");

     },
     filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now())
     }
   })
   const upload = multer({ storage: storage })



   app.get("/upLoadImage/:currentUser",(req,res)=>{
       UserModel.findOne({UserName: req.params.currentUser}, (err, currentUser) => {
           res.render("imageUpload.ejs", {currentUser:currentUser});
       })
 })


 app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
     const img = fs.readFileSync(req.file.path);
     const encode_img = img.toString('base64');
     const final_img = {
         UserName: req.body.UserName,
         subject: req.body.subject,
         desc: req.body.desc,
         img: {
         data: fs.readFileSync(path.join(__dirname + '/public/photos/uploads/' + req.file.filename)),
         contentType: 'image/png'
        }
    }

    Image.create(final_img, (err,result)=>{
        if(err){
             console.log(err);
         }else{
         console.log(`this is path ${final_img.path}`);
         let UserName = final_img.UserName

         PostModel.find({}, (err, allPost) => {
             Image.find({}, (err, allPhotos) => {
                 UserModel.findOne({UserName: UserName}, (err, currentUser) => {
                     UserModel.find({}, (err, allUsers) => {

                            res.render('gallery.ejs', {post:allPost, allUsers:allUsers,
                            currentUser: currentUser, allPhotos:allPhotos});
                        })
                    }).sort({"_id": -1})
                })
            })
        }
             // res.contentType(final_img.contentType);
             // res.send(final_img.image);
    })

})

 // //======================================================







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
app.post('/login',(req, res) => {
    const user = UserModel.findOne({UserName: req.body.UserName});
    !user && res.status(404).json('user not found');
    const validPassword = compare(req.body.Password, user.Password)


})



//===========================================================================
//============== loads profile page with info found from first name key
app.get('/profile/:UserName/:CurrentUser' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        Image.find({}, (err, allPhotos) => {
            UserModel.findOne({UserName: req.params.CurrentUser}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: req.params.UserName}, (err, user) => {
                        res.render('profile.ejs', {data: user, post:allPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                })
            })
        })
    }).sort({"_id": -1})
});


//===========================================================================
// =============photo gallery page
app.get('/gallery/:UserName' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        Image.find({}, (err, allPhotos) => {
            UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: req.params.UserName}, (err, user) => {
                        res.render('gallery.ejs', {data: user, post:allPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                })
            })
        })
    }).sort({"_id": -1})

});
app.get('/galleryEdit/:id/:UserName', (req, res) => {
    Image.findOne({_id: req.params.id}, (err, userPhoto) => {
        Image.find({}, (err, photos) => {
            UserModel.find({}, (err, allUsers) => {
                UserModel.findOne({UserName: req.params.UserName},  (err, currentUser) => {
                     res.render('galleryEdit.ejs', {userPhoto:userPhoto, currentUser: currentUser, allUsers:allUsers, allPhotos: photos});
                })
            })
        })
    })
})

app.delete('/photoDelete/:id/:UserName',  (req, res)  => {
    Image.findOneAndDelete({
            _id: req.params.id
        }, (err, foundPhoto) => {
            PostModel.find({UserName: req.params.UserName}, (err, userPost) => {
                Image.find({}, (err, photos) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                         res.render('gallery.ejs', {currentUser: currentUser, post:userPost, allUsers:allUsers, allPhotos: photos});
                    })
                    })
                })
            })
    });
});


//===========================================================================
//====WORKING ON EDIT FEATURE ==========
//sent here from edit page. puts info into database and redirect back to
app.get('/edit/:id/edit', (req, res) => {

    PostModel.findOne({_id: req.params.id}, (err, userPost) => {
        // console.log(userPost.UserName);

        let UserName = userPost.UserName;
        console.log(`this is name ${UserName}`);

        UserModel.find({UserName: UserName}, (err, user) => {
            // console.log('we here');
            // console.log(user);
            res.render('update.ejs', { post:userPost, data: user});
        })
    })
});

app.put('/edit/:id', (req, res) => {
    // console.log(res);
    PostModel.findOne({_id: req.params.id}, (err, userPost) => {
        // console.log(userPost.UserName);
        let UserName = userPost.UserName;
        // console.log(`this is name ${UserName}`);


    PostModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, post) => {
        PostModel.find({UserName: UserName}, (err, usersPost) => {
            UserModel.find({}, (err, allUsers) => {
                UserModel.find({UserName: UserName}, (err, user) => {
                    res.render('profile.ejs', {data: user, post:usersPost, allUsers:allUsers});
                })
                })
            })
        }).sort({"_id": -1})
    })

});


//===========================================================================
//==== Creates new post. =======
app.get('/newPost/:UserName/newPost', (req, res) => {

    UserModel.find({UserName: req.params.UserName}, (err, user) => {
        res.render('postPage.ejs', {
            data: user
        });
    });
});

app.post('/newPost/:UserName', (req, res) => {
    // console.log(req)
    PostModel.find({UserName: req.params.UserName}, (err, userPost) => {
        Image.find({}, (err, allPhotos) => {
            UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: req.params.UserName}, (err, user) => {
                        res.render('profile.ejs', {data: user, post:userPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                })
            })
        })
    }).sort({"_id": -1})
});





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




Image.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} pictues in this database` );
});
UserModel.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} users in this database` );
});
PostModel.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} post in this database` );
});








//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
