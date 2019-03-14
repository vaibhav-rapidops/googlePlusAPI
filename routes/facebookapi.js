const passport=require('passport');
const FacebookStrategy=require('passport-facebook').Strategy;
const express=require('express');
const router=express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy({
   clientID: "245216186429834",
   clientSecret: "e760c4eff163c63dbb9cf9c6caea340b",
   callbackURL: "http://localhost:3000/facebook/auth/facebook/callback"
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