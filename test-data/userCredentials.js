import generateRandomEmail from '../utils/generateRandomEmail';

export const userCredentials = {
  validUserData: {
    username: 'Neo',
    lastname: 'Neon',
    randomEmail: generateRandomEmail(),
    password: 'Neofortest222',
  },
  
  invalidUserData: {
    username: '12',
    lastname: '12',
    email: 'neofortest22',
    password: 'neofortest',
    rptPwd: 'Neofortest221',
  },
  
  invalidLengthUserDataMin: {
    username: 'N',
    lastname: 'L',
  },
  
  invalidLengthUserDataMax: {
    username: 'Nnnnnnnnnnnnnnnnnnnnmax',
    lastname: 'Lnnnnnnnnnnnnnnnnnnnmax',
  }
};