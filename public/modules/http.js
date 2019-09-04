(function () {
    'use sctrict'


    /*
     *Модуль, предоставляющий методы для выполнения HTTP-запросов
     *
     *
     */

     class Http {
         /*
         *  Выполняет GET-запрос по указанному адресу
         * @param {string} path - адресс запроса
         * @param {Function} callback - функция-коллбек
          */
        static Get(path, callback){
            const xhr = new XMLHttpRequest();
            xhr.open('Get', path,true);
            xhr.withCredentials = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                if (+xhr.status !=200){
                    return callback(xhr)
                }
                const response = JSON.parse(xhr.responseText);
                callback(null,response);
            }
            xhr.send();
        }


         /*
          * Выполняет Post-запрос по указанному адресу
          * @param {string} path - адресс запроса
          * @param {*} body - тело запроса (объект)
          * @param {Function} callback - функция-коллбек
          */
        static Post(path, body, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'path',true);
            xhr.withCredentials = true;

            xhr.setRequestHeader('Content-Type', 'application/json; charset = utf8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                if (+xhr.status !=200){
                    return callback(xhr, null)
                }
                const response = JSON.parse(xhr.responseText);
                callback(null,response);
            }
            xhr.send(JSON.stringify(body));

        }
     }
     window.Http = Http;
    })