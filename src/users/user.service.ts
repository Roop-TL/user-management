import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import shortUUID = require('short-uuid');

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      userId: user.id,
      userName: user.userFirstName + ' ' + user.userLastName,
      userEmail: user.userEmail,
      userContact: user.userMobile.join(','),
      userOrg: user.orgId,
    }));
  }

  async getSingleUser(userId: string) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      return {
        userId: user.id,
        userName: user.userFirstName + ' ' + user.userLastName,
        userEmail: user.userEmail,
        userContact: user.userMobile.join(','),
        userOrg: user.orgId,
      };
    } catch (error) {
      throw new NotFoundException('Incorrect User Id');
    }
  }

  async addUser(
    firstName: string,
    lastName: string,
    email: string,
    mobile: string[],
  ) {
    try {
      const checkEmail = await this.userModel.findOne({ userEmail: email });
      if (checkEmail) {
        return 'ER1';
      } else {
        const checkMobile = await this.userModel.findOne({
          userMobile: mobile[0],
        });
        if (checkMobile) {
          return 'ER2';
        }
      }
      const uuid = `tl-${shortUUID.generate()}`;
      const newUser = new this.userModel({
        id: uuid,
        userFirstName: firstName,
        userLastName: lastName,
        userEmail: email,
        userMobile: mobile,
      });
      const userId = await newUser.save();
      return userId.id;
    } catch (error) {
      if (!firstName || !lastName || !email || !mobile) {
        throw new NotFoundException(
          'firstName or lastName or email or mobile is missing',
        );
      }
      throw new NotFoundException(
        'Something went wrong while creating the user',
      );
    }
  }
}
