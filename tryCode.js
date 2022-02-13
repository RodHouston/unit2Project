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
