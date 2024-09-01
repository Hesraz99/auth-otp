import { IsMobilePhone, IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsMobilePhone(
    'fa-IR',
    {},
    { message: ['mobile number is invalid'].join('') },
  )
  mobile: string;
}

export class CheckOtpDto {
  @IsMobilePhone(
    'fa-IR',
    {},
    { message: ['mobile number is invalid'].join('') },
  )
  mobile: string;

  @IsString()
  @Length(4, 4, { message: ['code is invalid'].join('') })
  code: string;
}
