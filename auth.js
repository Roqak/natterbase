var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretIsaSecretee';
const User = {
    username: "admin",
    password: "admin"
};
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        if(User.username === "admin"){
            ({id: jwt_payload.sub}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                    res.status(200).json({jso:"Done"})
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }
        
    }));
};
