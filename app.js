const express=require('express');
const {google} = require('googleapis');
const app=express();
const googleapiRoute=require('./routes/googleapi');
app.set('view engine', 'ejs');
const facebookapiRoute=require('./routes/facebookapi');
//app.set('json replacer', replacer); // property transformation rules
app.set('json spaces', 2);
app.get('/',(req,res)=>{
  
  const str="hello";
  const links={
  	link1:{
  	    description:"To access Google API",
  		   url:"http://localhost:3000/google"
  	     },
  	link2:{
  		description:"To access FaceBook API",
  		url:"http://localhost:3000/facebook"
  	}
  }

  const response=`<h1>LINKS TO API_LOGIN</h1><br/><br/>
           <table>
           <tr>
            <th>URL</th>
            <th>Description</th>
           </tr>
           <tr>
             <td><a href='${links.link1.url}'>${links.link1.url}</a></td>
             <td>${links.link1.description}</td>
             </tr>
             <tr>
            <td><a href='${links.link2.url}'>${links.link2.url}</td>
            <td>${links.link2.description}</td>
          </tr>
          </table>`;
res.writeHead(200, { 'Content-Type': 'text/html' });
res.write(response);
res.end();
});
	

app.use('/google',googleapiRoute);
app.use('/facebook',facebookapiRoute);

module.exports=app;