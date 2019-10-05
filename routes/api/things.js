// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const thing = require('../../models/Things');

// GET api/things/test
// 返回的请求的json数据
// public
router.get('/test', (req, res) => {
  res.json({ msg: 'thing works2' });
});

// POST api/things/add
// 创建信息接口
// Private
router.post(
  '/add',
  (req, res) => {
    const thingFields = {};

    if (req.body.thingname) thingFields.thingname = req.body.thingname;
    if (req.body.thingnumber) thingFields.thingnumber = req.body.thingnumber;
    if (req.body.single) thingFields.single = req.body.single;
    if (req.body.expend) thingFields.expend = req.body.expend;
    thingFields.allmoney = thingFields.thingnumber*thingFields.single;
    console.log("thing1",req.body)
    new thing(thingFields).save().then(thing => {
      console.log('tag', thingFields)
      res.json(thing);
    });
  }
);

// GET api/things
// 获取所有信息
// Private

router.get(
  '/',
  (req, res) => {
    thing.find()
      .then(thing => {
        if (!thing) {
          return res.status(404).json('没有任何内容');
        }

        res.json(thing);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET api/things/:id
// 获取单个信息
// Private

router.get(
  '/:id',
  (req, res) => {
    thing.findOne({ _id: req.params.id })
      .then(thing => {
        if (!thing) {
          return res.status(404).json('没有任何内容');
        }

        res.json(thing);
      })
      .catch(err => res.status(404).json(err));
  }
);

// POST api/things/edit
// 编辑信息接口
// Private
router.post(
  '/edit/:id',
  (req, res) => {
    const thingFields = {};

    if (req.body.thingname) thingFields.thingname = req.body.thingname;
    if (req.body.thingnumber) thingFields.thingnumber = req.body.thingnumber;
    if (req.body.single) thingFields.single = req.body.single;
    if (req.body.expend) thingFields.expend = req.body.expend;
    thingFields.allmoney = thingFields.thingnumber*thingFields.single;

    thing.findOneAndUpdate(
      { _id: req.params.id },
      { $set: thingFields },
      { new: true }
    ).then(thing => res.json(thing));
  }
);

// POST api/things/delete/:id
// 删除信息接口
// Private
router.delete(
  '/delete/:id',
  (req, res) => {
    thing.findOneAndRemove({ _id: req.params.id })
      .then(thing => {
        thing.save().then(thing => res.json(thing));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);

module.exports = router;
