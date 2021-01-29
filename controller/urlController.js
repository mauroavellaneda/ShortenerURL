const Url = require("../models/Url");

exports.home = (req, res) => {
  res.render("index");
};

exports.addUrl = async (req, res, next) => {
  let response;
  const url = new Url({ urlOriginal: req.body.urlOriginal });

  try {
    let result = await url.save();
    response = {
      code: 201,
      message: "Correctly saved",
      url: result.urlShort,
    };
  } catch (error) {
    console.log(error);
    response = {
      code: 400,
      error: "Something went wrong",
    };
  }
  res.json(response);
  next();
};

exports.redirectUrl = async (req, res, next) => {
  const url = await Url.findOne({ urlShort: req.params.url });
  if (!url) {
    res.redirect("/?error=404");
    next();
  }
  res.redirect(url.urlOriginal);
  next();
};
