import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class Helpers {
  constructor(@Inject('TransactionHelper') readonly transaction) {}
}
