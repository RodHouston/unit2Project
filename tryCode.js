<!-- <form class="" action="/edit/<%=data[0].firstName%>?_method=PUT" method="POST">
    <strong>Post:</strong> <br/>
    <%for(let val of data[0].post){%>

    <input type="text" name="post" value="<%=data[0].post[0].subject%>"><br/>
    <strong>Type:</strong><br/>
    <input type="text" name="type" value="%=val.body%>"><br/>
    <input id='subEdit' type="submit" name="" value="Post ">
    <%}%> -->



    <form class="" action="/edit/<%=data[0].firstName%>?_method=PUT" method="POST">
        <strong>Post:</strong> <br/>
        <%for(let val of data[0].post){%>


        <input type="text" name="type" value="<%=data[0].post[0].subject%>"><br/>
        <strong>Body:</strong><br/>
        <input type="text" name="type" value="<%=val.body%>"><br/>
        <input id='subEdit' type="submit" name="" value="Post">
        <%}%>


        <iframe src="https://www.google.com/maps/d/embed?mid=188AKtKofEFlJRHrRl4--eV9gn1zaO1jK&ehbc=2E312F" width="100%" height="100%"></iframe>


        // ImageModel.create(ImageSeed, ( err , data ) => {
        //       if ( err ) console.log ( err.message )
        //   console.log( "added  data" )
        //   }
        // );
        <!DOCTYPE html>
        <html lang="en">

        <head>
        	<meta charset="UTF-8">
        	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        	<title>Image Uploading</title>
        </head>

        <body>
        	<h1>To Upload Image on mongoDB</h1>
        	<hr>
        	<div>
        		<form action="/" method="POST" enctype="multipart/form-data">
        			<div>
        				<label for="name">Image Title</label>
        				<input type="text" id="name" placeholder="Name"
        					value="" name="name" required>
        			</div>
        			<div>
        				<label for="desc">Image Description</label>
        				<textarea id="desc" name="desc" value="" rows="2"
        						placeholder="Description" required>
        				</textarea>
        			</div>
        			<div>
        				<label for="image">Upload Image</label>
        				<input type="file" id="image"
        					name="image" value="" required>
        			</div>
        			<div>
        				<button type="submit">Submit</button>
        			</div>
        		</form>
        	</div>

        	<hr>

        	<h1>Uploaded Images</h1>
        	<div>
        		<% items.forEach(function(image) { %>
        		<div>
        			<div>
        				<img src="data:image/<%=image.img.contentType%>;base64,

        				<div>
        					<h5><%= image.name %></h5>



        <p><%= image.desc %></p>



        				</div>
        			</div>
        		</div>
        		<% }) %>
        	</div>
        </body>

        </html>
        //=============================
        // owner: req.body.owner,
        // desc: req.body.desc,
        // contentType:req.file.mimetype,
        // image:new Buffer(encode_img,'base64')
        // };
        //
        //
        //
        // <%for(let val of all



        <!-- <img class='try' src="data:image/<%=image.img.contentType%>;base64,
             <%=image.img.data.toString('base64')%>"> -->
             <div class="try" src = 'backgroundImage: url(data:image/<%=image.img.contentType%>;base64,
                  <%=image.img.data.toString('base64')%>)'>
const image = document,getElementById('try')


<div class="box" id='boxes'  onclick = zoom();>
<img id='try' src="data:image/<%=image.img.contentType%>;base64,
     <%=image.img.data.toString('base64')%>">
<div class="clip" id='right' ></div>
<div class="clip" id='left'></div>
<div class="clip" id='up'></div>
<div class="clip" id='down'></div>
<span id='rightClip' class="clipper">Click to Zoom</span>
<span id='leftClip' class="clipper">Click to Zoom</span>
<span id='upClip' class="clipper">Click to Zoom</span>
<span id='downClip' class="clipper">Click to Zoom</span>
</div>

<div id="myModal" class="modal">


<span class="close">&times;</span>


<!-- <div class="modal-content" id="img01" ></div> -->
<img class="modal-content" id="img01" src="data:image/<%=image.img.contentType%>;base64,
<%=image.img.data.toString('base64')%>">


<div id="caption"></div>
</div>

<%
})}%>

<% allPhotos.forEach(function(image) { %>
const $divBox = $('<div>').attr(`id`, `div${image.id}`).addClass('box')
const $imag = $( '<img>').attr('src', `data:image/<%=image.img.contentType%>;base64,
     <%=image.img.data.toString('base64')%>`);
const $divRight = $('<div>').attr(`id`, `right`).addClass('clip')
const $divLeft = $('<div>').attr(`id`, `left`).addClass('clip')
const $divUp = $('<div>').attr(`id`, `up`).addClass('clip')
const $divDown = $('<div>').attr(`id`, `down`).addClass('clip')
const $spanR = ('<span>').attr(`id`, `rightClip`).addClass('clipper')
const $spanL = ('<span>').attr(`id`, `leftClip`).addClass('clipper')
const $spanU = ('<span>').attr(`id`, `upClip`).addClass('clipper')
const $spanD = ('<span>').attr(`id`, `downClip`).addClass('clipper')

const modal = document.getElementById("myModal");

const image = document.getElementById('try')

function zoom(img) {
const modalImg = document.getElementById('img01');
// const img = document.getElementById('boxes');
    // console.log(img);
  modal.style.display = "block";
  modalImg.style.backgroundImage = img;
}
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
$divBox.appendTo('.gallery')
$divRight.appendTo(`div${image.id}`)
$divLeft.appendTo(`div${image.id}`)
$divUp.appendTo(`div${image.id}`)
$diDown.appendTo(`div${image.id}`)
$spanR.appendTo(`div${image.id}`)
$spanL.appendTo(`div${image.id}`)
$spanU.appendTo(`div${image.id}`)
$spanD.appendTo(`div${image.id}`)



<%})%>
