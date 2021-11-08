import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class CustomValidationPipe implements PipeTransform {
  transform(value: any): any {
    console.log(value);
  }
}
