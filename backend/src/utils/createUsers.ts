import { faker } from '@faker-js/faker';


interface UserModel {
  id: string
  name: string
  email: string
  phone: string
}
export const users: UserModel[] = [];

export function createRandomUser(): UserModel {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  users.push(createRandomUser());
});






