import * as multer from 'multer';
import * as path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

function imageFileFilter(req: Request, file: Express.Multer.File, cb: any) {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
    return cb(new Error('Only image files'), false);
  }
  cb(null, true);
}

export const multerConfig = {
  storage,
  fileFilter: imageFileFilter,
};