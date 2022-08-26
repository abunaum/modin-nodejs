const cek = function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        const session = req.session;
        if (req.user.provider === 'github') {
            if (req.user.emails[0].value !== 'abunaum@hotmail.com') {
                res.redirect('/logout');
            } else {
                session.user= {
                    'email': req.user.emails[0].value,
                    'picture': req.user.photos[0].value
                };
                next();
            }
        } else {
            if (req.user.email !== 'abunaum@hotmail.com') {
                res.redirect('/logout');
            } else {
                session.user= {
                    'email': req.user.email,
                    'picture': req.user.picture
                };
                next();
            }
        }
    }
}

module.exports = cek;