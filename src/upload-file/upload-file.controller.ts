import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './upload-file.service';
import * as ip from 'ip';
import { join } from 'path';

export const number = 10;
export const field = { name: 'file3', maxCount: 1 };

@Controller('upload-file')
export class UploadFileController {


  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 460800, //Byte
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      ...file,
      absPath: `${ip.address()}:2001` + '/images/' + file.filename,
    };
  }

  @Post('/multiple-files')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 460800, //Byte
      },
    }),
  )
  uploadMultiFiles(@UploadedFiles() files) {
    // return files;
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        // originalname: file.originalname,
        // filename: file.filename,
        ...file,
        absPath: `${ip.address()}:2001` + '/images/' + file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Post('/multiple-files-fields')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 2 }, //
        { name: 'file2', maxCount: 1 },
        //field,
      ],
      {
        storage: diskStorage({
          destination: './images',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        limits: {
          fileSize: 460800, //Byte
        },
      },
    ),
  )
  uploadMultiFilesFields(@UploadedFiles() files) {
    return files;
  }
}
