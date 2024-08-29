import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { SendOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,) { }


    sendOtp(otpDto:SendOtpDto) {



    }
}
