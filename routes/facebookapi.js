const passport=require('passport');
const FacebookStrategy=require('passport-facebook').Strategy;
const express=require('express');
const router=express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy({
   clientID: "",
   clientSecret: "",
   callbackURL: ""
  }, 
function (accessToken, refreshToken, profile, done) {
        done(null, profile);
}
));

passport.serializeUser((user,done)=>{
	done(null,user);
})
passport.deserializeUser(function(user,done){
	done(null,user);
})

router.get('/',(req,res,next)=>{
   res.redirect('facebook/auth/facebook');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/facebook/userData');
  });
router.get('/userData',(req,res)=>{
	res.status(200).send('Login Successfull....');
})


module.exports=router;