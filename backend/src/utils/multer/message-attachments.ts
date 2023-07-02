import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD = 'uploads/message-attachments';

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
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/vnd.ms-excel' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-powerpoint' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.mimetype === 'text/plain'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
    }
  }
}).fields([
  { name: 'file_url', maxCount: 1 },
  { name: 'image_url', maxCount: 1 }
]);

export default upload;
