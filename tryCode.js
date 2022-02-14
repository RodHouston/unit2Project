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
