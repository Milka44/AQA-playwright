import { faker } from '@faker-js/faker';

export const USERS = {
    USER1 : {
        email: 'aqa-neotest8568@gm.com',
        password: 'Neofortest222'
    },

    USER2: {
        name: faker.person.firstName(),
        lastName: "Dou",
        email: faker.internet.email(),
        password: faker.internet.password(12, false, /[A-Za-z0-9]/, 'Neo2')
    }
}


// USER2 : {
//     name: 'Neo',
//     lastName: 'Neon',
//     email: 'aqa-neotest8569@gm.com',
//     password: 'Neofortest2221'
// }