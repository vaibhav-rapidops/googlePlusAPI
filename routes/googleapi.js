const {google} = require('googleapis');
const express=require('express');
const router=express.Router();
const localstorage= require('local-storage');
const config={
  CLIENT_ID:"",
  CLIENT_SECRET:"",
  REDIRECT_URL:""}

const oauth2Client = new google.auth.OAuth2(config.CLIENT_ID,config.CLIENT_SECRET,config.REDIRECT_URL);
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/contacts.readonly'];
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

router.get('/',(req,res,next)=>{
	res.redirect(url);
});

router.get('/userinfo',async (req,res,next)=>{
	const code=req.query.code;
	try{
	const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    localstorage.set("access_token",tokens); 
    res.status(200).redirect('/google/userData');
    }catch(error){
	console.log(error);}
});
router.get('/userData',(req,res,next)=>{
 	 const tokens=localstorage.get("access_token");
     oauth2Client.setCredentials(tokens);
     let userDetail=[];
       const service = google.people({version: 'v1', auth:oauth2Client});
       service.people.connections.list({resourceName: 'people/me',personFields:'names,phoneNumbers'},(error,result)=>{
       if(error) return console.log(error);
       let userData=result.data.connections;
       if(userData){
         	userData.forEach(people=>{
       		    if((people.names && people.names.length>0) && (people.phoneNumbers && people.phoneNumbers.length>0)){

                userDetail.push({
                	personName:people.names[0].displayName,
                    contectNo: people.phoneNumbers[0].value
                   })  
               }});
        }
       // res.status(200).(userDatail);

          res.render('../views/index',{userDetail:userDetail});


     });
});

module.exports=router;
