var User = require("./../models/user");
var api = require('./../bin/ah_api/req');
var Classroom = require('./../models/classroom');
var School = require("./../models/school");

module.exports = function (router, isAuthenticated) {
    /* GET Home Page */
    router.get('/classroom/', isAuthenticated, function (req, res) {
        School.getAll(null, function (err, schoolList) {
            var filterString = null;
            if (req.session.SchoolId =! 1){
                filterString = {SchoolId: req.session.SchoolId};
            }
            Classroom.findAll(filterString, null, function (err, classroomList) {
                res.render('classroom', {
                    user: req.user,
                    current_page: 'classroom',
                    classroomList: classroomList,
                    schoolList: schoolList,
                    session: req.session,
                    user_button: req.translationFile.user_button
                });
            });
        });
    });
};


