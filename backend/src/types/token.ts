import {  Types } from 'mongoose';

export interface ITokenModel {
  user: Types.ObjectId
  refreshToken: string 
}

