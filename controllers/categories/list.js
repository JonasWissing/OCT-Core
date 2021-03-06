var errors = require('./../../config/errors');
var client = require('./../db.js');
var _ = require('underscore');


exports.request = function(req, res) {
    queryStr = "SELECT c.category_id, c.category_name, (SELECT count FROM logs_count WHERE logs_count.category_id=c.category_id AND logs_count.type='Category_Searches') AS Searches, (SELECT count FROM logs_count WHERE logs_count.category_id=c.category_id AND logs_count.type='Category_Datasets') AS Datasets FROM public.categories c;";
    params = [];

    client.query(queryStr, params, function (err, result) {
        if(err) {
            res.status(errors.database.error_2.code).send(_.extend(errors.database.error_2, err));
            return console.error(errors.database.error_2.message, err);
        } else {
            res.status(200).send(result);
        }
    });
};
