const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default (req, res) => {
  const text = req.body.text;
  const image = req.body.image;

  return cloudinary.uploader.upload(
    image,
    {
      transformation: [
        {
          overlay: {
            font_family: 'Montserrat',
            font_size: 144,
            text: text,
          },
        },
        { flags: 'layer_apply', gravity: 'north_east' },
      ],
    },
    (error, result) => {
      if (error) return res.status(500).json({ Error: error });

      return res.status(200).json({ data: { ...result } });
    }
  );
};
