import { faker } from '@faker-js/faker';


interface User {
  id: string
  name: string
  email: string
  phone: string
}
export const users: User[] = [];

export function createRandomUser(): User {
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






