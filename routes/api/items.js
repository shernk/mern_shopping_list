const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   GET api/items/:id
// @desc    Get an Item
// @access  Private
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  // save item to database
  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ "delete": item.name })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
