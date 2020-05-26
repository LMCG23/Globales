const helpers = {};

helpers.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){

        return next();
    }
    req.flash('error_msg', 'No esta logeado');
    res.redirect('/');
}

module.exports = helpers; 