import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { SendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    ) { }

    async sendOtp(otpDto: SendOtpDto) {
        const { mobile } = otpDto;
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)

        let user = await this.userRepo.findOneBy({ mobile });
        // const otpcode = '1234';

        if (!user) {

            user = this.userRepo.create({
                mobile,
            })
            await this.userRepo.save(user);
            await this.createOtpForUser(user);


            return {
                message: ["otp code successfully"]
            }
        }
        else {
            // if user is not registerd 

        }

    }
    async createOtpForUser(user: UserEntity) {

        const otpcode = randomInt(1000, 9999).toString();

        let otp = await this.otpRepo.findOneBy({ userId: user.id });
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);

        if (otp) {
            // if otp exists
            otp.code = otpcode;
            otp.expires_in = expiresIn;
        } else {
            // if otp is empty
            otp = this.otpRepo.create({
                code: otpcode,
                expires_in: expiresIn,
                userId: user.id
            });
        }

        await this.otpRepo.save(otp);
        user.otp_id = otp.id;
        await this.userRepo.save(user);
    }

    async sendSms(receptor: string, message: string) {
        const apiKey = 'your_kavenegar_api_key';
        const sender = '10004346'; // Your sender number
        const url = `https://api.kavenegar.com/v1/${apiKey}/sms/send.json`;

        try {
            const response = await axios.post(url, {
                receptor: receptor,
                sender: sender,
                message: message
            });
            console.log('SMS sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    }
}





