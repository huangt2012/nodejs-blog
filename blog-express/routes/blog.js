var express = require('express');
const { getList } = require('../controller/blog');
const { SuccessModel } = require('../model/resModel');
var router = express.Router();

router.get('/list', function(req, res, next) {
  let { author = '' } = req.query;
    const { keyword = '' } = req.query;

    const result = getList(author, keyword);

    return result.then((listData) => {
      res.json(
        new SuccessModel(listData)
      )
    })
});

module.exports = router;
