module.exports = {
	init : function(app, passport, session) {
		app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
		app.use(passport.initialize());
		app.use(passport.session()); // persistent login sessions
	},
	start : function (app, passport, session) {

	}
};