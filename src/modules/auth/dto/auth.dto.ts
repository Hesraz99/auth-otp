import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber('IR', { message: ['mobile number is invalid'].join('') })
  mobile: string;
}

export class CheckOtpDto {
  @IsPhoneNumber('IR', { message: ['mobile number is invalid'].join('') })
  mobile: string;

  @IsString()
  @Length(4, 4, { message: ['code is invalid'].join('') })
  code: string;
}
