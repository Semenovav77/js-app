(function () {
    'use sctrict'

    const Http = window.Http;
    /*
     *  Сервис для работы с юзерами
     * UserService
     */
    class UserService {

        constructor(){
            this.user = null;
            this.users = [];
        }

        auth(username, email, callback) {
            Http.Post('/auth', {email, password, age}, callback)
        };

        isLoggedIn() {
            return !!this.user;
        }
        
        getData(callback, force = false) {
            if  (this.isLoggedIn() && !force) {
                return callback(null, this.user)
            }
            Http.Get('/me', function (err, userdata){
                if (err) {
                    return callback(err, userdata);
                }
                this.user = userdata;
                callback(null, userdata);
            }.bind(this));
        };

    }
    window.UserService = UserService;
}) ();