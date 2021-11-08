import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class CustomValidation implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(value);
    console.log(metatype);
    // if (this.isEmpty(value)) {
    //   throw new HttpException(
    //     `Validation failed: No payload provided`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // const errors = await validate(object);
    //
    const object = plainToClass(metatype, value);
    console.log(object);

    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    console.log(errors);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private isEmpty(value: any) {
    return Object.keys(value).length < 1;
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(', ');
  }
}

// extends global pipe
// import { ValidationPipe, ArgumentMetadata, Injectable } from '@nestjs/common';
// import { REWRITE_VALIDATION_OPTIONS } from '../decorators/constants';
//
// @Injectable()
// export class MyValidationPipe extends ValidationPipe {
//   async transform(value: any, metadata: ArgumentMetadata) {
//     const options = Reflect.getMetadata(REWRITE_VALIDATION_OPTIONS, metadata.metatype);
//     let originOptions;
//     if (options) {
//       originOptions = Object.assign({}, this.validatorOptions);
//       this.validatorOptions = Object.assign(this.validatorOptions, options);
//     }
//     try {
//       const result = super.transform(value, metadata);
//       if (originOptions) {
//         this.validatorOptions = originOptions;
//       }
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
