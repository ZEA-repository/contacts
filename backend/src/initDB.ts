import { connection } from 'mongoose';
import User from '../models/userModel';
import { getJsonFile } from './helpers';

const data = getJsonFile('../db.json')

export async function initDB() {
  if (connection.readyState === 1) await User.collection.insertMany(data)
}


