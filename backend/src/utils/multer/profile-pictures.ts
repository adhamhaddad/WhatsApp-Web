import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD = 'uploads/profile-pictures';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
    }
  }
}).single('image_url');

export default upload;
