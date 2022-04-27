const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default (req, res) => {
  const image = req.body;

  return cloudinary.uploader.upload(image, (error, result) => {
    if (error) return res.status(500).json({ Error: error });

    return res.status(200).json({ data: { ...result } });
  });
};
