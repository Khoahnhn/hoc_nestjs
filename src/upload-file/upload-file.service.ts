import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Sai định dạng file'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  callback(null, `${Date.now()}-${file.originalname}`);
};

// export const storage = {
//   storage: diskStorage({
//     destination: './images',
//     filename: (req, file, cb) => {
//       const filename: string =
//         path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;
//
//       cb(null, `${filename}${extension}`);
//     },
//   }),
// };
