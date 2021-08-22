const Hotel = require("../models/hotel");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name);
    // const Hotel = await new Hotel({ name, slug: slugify(name) }).save();
    // res.json(Hotel);
    res.json(await new Hotel(req.body).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create Hotel failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Hotel.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let hotel = await Hotel.findOne({ slug: req.params.slug }).exec();
  // res.json(Hotel);

  res.json({
    hotel,
  });
};

exports.update = async (req, res) => {
  try {
    const updatedValue = await Hotel.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    console.log(updatedValue);
    res.json(updatedValue);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Hotel.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Hotel delete failed");
  }
};

exports.handleQuery = async (req, res) => {
  const { query } = req.body;
  console.log(query);

  const hotels = await Hotel.find({ $text: { $search: query } }).exec();

  res.json(hotels);
};
