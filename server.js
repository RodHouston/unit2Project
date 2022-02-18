//___________________
//Dependencies
//___________________
const express = require('express'),
bodyParser = require("body-parser"),
fs = require("fs"),
multer = require("multer");

// const imgur = require('imgur')
// const fileUpload = require('express-fileupload')


const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const UserModel = require('./models/user.js')
const UserSeed = require('./models/userSeed.js')

const PostModel = require('./models/postModel.js')
const PostSeed = require('./models/postSeed.js')

const PhotoModel = require('./models/photoModel.js')


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

// app.use(fileUpload())
// app.set('viw engine', 'ejs');
// app.set('views', 'views')

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
//
 // const storage = multer.diskStorage({
 //     destination: function (req, file, cb) {
 //       cb(null, "./public/photos/uploads");
 //     },
 //     filename: function (req, file, cb) {
 //       cb(null, file.fieldname + '-' + Date.now())
 //     }
 //   })
 //   const upload = multer({ storage: storage, limits: {  fileSize: 6000000, files: 1 }});


//    app.get("/upLoadImage/:currentUser",(req,res)=>{
//        UserModel.findOne({UserName: req.params.currentUser}, (err, currentUser) => {
//            if(err){
//                 console.log(err);
//             }else{
//            res.render("imageUpload.ejs", {currentUser:currentUser});
//        }
//    })
// })
//
//
//  app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
//      const img = fs.readFileSync(req.file.path);
//      const encode_img = img.toString('base64');
//      const final_img = {
//          UserName: req.body.UserName,
//          subject: req.body.subject,
//          desc: req.body.desc,
//          img: {
//          data: fs.readFileSync(path.join(__dirname + '/public/photos/uploads/' + req.file.filename)),
//          contentType: 'image/png'
//         }
//     }
//
//     Image.create(final_img, (err,result)=>{
//         if(err){
//              console.log(err);
//          }else{
//          // console.log(`this is path ${final_img.path}`);
//          let UserName = final_img.UserName
//
//          PostModel.find({}, (err, allPost) => {
//              Image.find({}, (err, allPhotos) => {
//                  UserModel.findOne({UserName: UserName}, (err, currentUser) => {
//                      UserModel.find({}, (err, allUsers) => {
//                             res.render('gallery.ejs', {post:allPost, allUsers:allUsers,
//                             currentUser: currentUser, allPhotos:allPhotos});
//                         })
//                     })
//                 })
//             })
//         }
//     })
// })

 // //=====================images 2.0=================================


// app.set('view engine', 'ejs')
// app.set('views', 'views')
//
//
//  app.get('/gal', (req, res) => {
//      res.render('index.ejs');
//  });
//  app.post('/upload', (req, res) => {
//  	if (!req.files) {
//  		return res.status(400).send('No files were uploaded.')
//  	}
//
//  	let file = req.files.file
//  	let uploadPath = __dirname + '/public/photos/uploads/' + file.name
//
//  	sampleFile.mv(uploadPath, function (err) {
//  		if (err) {
//  			return res.status(500).send(err)
//  		}
// console.log(uploadPath);
// let link = uploadPath
//  		imgur.uploadFile(uploadPath).then((urlObject) => {
//  			fs.unlinkSync(uploadPath)
//  			res.render('uploaded.ejs', { link: urlObject.link })
//  		})
//         res.render('upload.ejs', {link: link})
//  	})
//  })

// app.get("/upLoadImage/:currentUser",(req,res)=>{
//     UserModel.findOne({UserName: req.params.currentUser}, (err, currentUser) => {
//         if(err){
//              console.log(err);
//          }else{
//         res.render("imageUpload.ejs", {currentUser:currentUser});
//     }
// })
// })
// //=======================images 3.0 ===============================
app.get('/newPhotoUpload/:UserName', (req, res) => {

    UserModel.findOne({UserName: req.params.UserName}, (err, user) => {
        res.render('newImageUpload.ejs', {
            currentUser: user
        });
    });
});

app.post('/uploadPhoto/:UserName', (req, res) => {
    // console.log(req)

    PhotoModel.create(req.body), (err, createdPost) => {
        res.send(req.body);
     }
    PhotoModel.find({}, (err, allPhotos) => {
    PostModel.find({UserName: req.params.UserName}, (err, userPost) => {
        Image.find({}, (err, all) => {
            UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: req.params.UserName}, (err, user) => {
                        res.render('profile.ejs', {data: user, post:userPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                 })
                })
            })
        })
    }).sort({"_id": -1})
})

//=============Creates new user send here from login page(/)
app.post('/newUser', (req, res) => {
    UserModel.create(req.body), (err, createdUser) => {
        res.send(req.body);
    }

    res.redirect('/good');
})

app.get('/newUser', (req, res) => {
    res.render('newUser.ejs');
});

//===========================================================================
//=============Login Page.======================================
app.get('/' , (req, res) => {
        let message = "Welcome"
    res.render('login.ejs',{message: message});
});
app.get('/:message',(req, res) => {
    // work on validation compare userName and password to DB
        let message = req.params.message
    res.render('login.ejs', {message: message})
})

//===========================================================================
//============== loads profile/wall page with info found from first name key
app.get('/profile/:UserName/:CurrentUser' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        PhotoModel.find({}, (err, allPhotos) => {
            Image.find({}, (err, all) => {
                UserModel.findOne({UserName: req.params.CurrentUser}, (err, currentUser) => {
                    if( currentUser== null){
                        res.redirect('/error');
                    } else {
                    UserModel.find({}, (err, allUsers) => {
                        UserModel.find({UserName: req.params.UserName}, (err, user) => {
                            res.render('profile.ejs', {data: user, post:allPost, allUsers:allUsers,
                            currentUser: currentUser, allPhotos:allPhotos});
                        })
                    })}
                })
            })
        })
    }).sort({"_id": -1})
});
//===========================================================================
//============== userProfile Page
app.get('/userProfile/:UserName/:CurrentUser' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        PhotoModel.find({}, (err, allPhotos) => {
            Image.find({}, (err, all) => {
                UserModel.findOne({UserName: req.params.CurrentUser}, (err, currentUser) => {
                    UserModel.find({}, (err, allUsers) => {
                        UserModel.find({UserName: req.params.UserName}, (err, user) => {
                            res.render('userProfile.ejs', {data: user, post:allPost, allUsers:allUsers,
                            currentUser: currentUser, allPhotos:allPhotos});
                        })
                    })
                })
            })
        })
    }).sort({"_id": -1})
});
app.get('/usersPost/:id/:CurrentUser', (req, res) => {
    PostModel.findOne({_id: req.params.id}, (err, usersPost) => {
        let User = usersPost.UserName
        UserModel.findOne({UserName: req.params.CurrentUser}, (err, currentUser) => {
            UserModel.findOne({UserName: User}, (err, user) => {
            res.render('usersPost.ejs',{usersPost: usersPost, currentUser: currentUser, user: user})
            })
        })
    })
})


//===========================================================================
// =============photo gallery page
app.get('/gallery/:UserName' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        PhotoModel.find({}, (err, allPhotos) => {
            UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: req.params.UserName}, (err, user) => {
                        res.render('gallery.ejs', {data: user, post:allPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                })
            })
        }).sort({"_id": -1})
    })
});
app.get('/galleryEdit/:id/:UserName', (req, res) => {
    PhotoModel.findOne({_id: req.params.id}, (err, userPhoto) => {
        PhotoModel.find({}, (err, photos) => {
            UserModel.find({}, (err, allUsers) => {
                UserModel.findOne({UserName: req.params.UserName},  (err, currentUser) => {
                     res.render('galleryEdit.ejs', {userPhoto:userPhoto, currentUser: currentUser, allUsers:allUsers, allPhotos: photos});
                })
            })
        })
    })
})

app.delete('/photoDelete/:id/:UserName',  (req, res)  => {
    Image.findOneAndDelete({_id: req.params.id}, (err, foundPhoto) => {
        PostModel.find({UserName: req.params.UserName}, (err, userPost) => {
            Image.find({}, (err, photos) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.findOne({UserName: req.params.UserName}, (err, currentUser) => {
                         res.render('userGallery.ejs', {currentUser: currentUser, user:currentUser, post:userPost, allUsers:allUsers, allPhotos: photos});
                    })
                })
            })
        })
    });
});
app.get('/userGallery/:UserName/:currentUser' , (req, res) => {
    PostModel.find({}, (err, allPost) => {
        PhotoModel.find({}, (err, allPhotos) => {
            UserModel.findOne({UserName: req.params.currentUser}, (err, currentUser) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.findOne({UserName: req.params.UserName}, (err, user) => {
                        res.render('userGallery.ejs', {user: user, post:allPost, allUsers:allUsers,
                        currentUser: currentUser, allPhotos:allPhotos});
                    })
                })
            })
        }).sort({"_id": -1})
    })
});


//===========================================================================
//====WORKING ON EDIT FEATURE ==========
//sent here from edit page. puts info into database and redirect back to
app.get('/edit/:id/edit', (req, res) => {

    PostModel.findOne({_id: req.params.id}, (err, userPost) => {
        // console.log(userPost.UserName);
        let UserName = userPost.UserName;
        // console.log(`this is name ${UserName}`);

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

        Image.find({}, (err, allPhotos) => {
        PostModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, post) => {
            PostModel.find({UserName: UserName}, (err, usersPost) => {
                UserModel.find({}, (err, allUsers) => {
                    UserModel.find({UserName: UserName}, (err, currentUser) => {
                        res.redirect(`/profile/${UserName}/${UserName}`)
                        })
                    })
                })
            }).sort({"_id": -1})
        })
    })
});
//===========================================================================
//==== Edit User Info/DELETE profile. =======
app.get('/editUser/:userName', (req, res) => {
    UserModel.findOne({UserName: req.params.userName}, (err, user) => {
        // console.log('we here');
        // console.log(user);
        res.render('userEdit.ejs', {currentUser: user});
    })
});

app.put('/editUser/:id', (req, res) => {
    // console.log(res);
    UserModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
        let UserName = user.UserName;
        res.redirect(`/userProfile/${UserName}/${UserName}`)
    })
})

app.delete('/userDelete/:id', (req, res) => {
    // console.log(res);
    UserModel.findOneAndDelete({_id: req.params.id},  (err, user) => {
        let UserName = user.UserName;
        PostModel.deleteMany({UserName: UserName}, (err, usersPost) => {
            Image.deleteMany({UserName: UserName}, (err, usersPost) => {
                    res.redirect(`/`)
            })
        })
    })
})
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

    PostModel.create(req.body), (err, createdPost) => {
        res.send(req.body);
     }

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
})






PhotoModel.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} photos in this database` );
});

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
