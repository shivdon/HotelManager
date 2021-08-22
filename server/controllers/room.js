const Room = require("../models/Room");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.roomtype);
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Room(req.body).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Room failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Room.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let room = await Room.findOne({ slug: req.params.slug }).exec();

  res.json({
    room,
  });
};

exports.update = async (req, res) => {
  req.body.slug = slugify(req.body.roomtype);
  try {
    const updated = await Room.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Room update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Room.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Room delete failed");
  }
};

exports.handleDateFilter = async (req, res) => {
  const { date } = req.body;

  try {
    const room = await Room.find({
      $and: [{ startdate: { $gte: date[0] } }, { enddate: { $lte: date[1] } }],
    });

    res.json(room);
  } catch (err) {
    res.status(400).send("Not available Rooms");
  }
};
