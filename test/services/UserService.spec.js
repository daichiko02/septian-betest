const userService = require('../../app/services/UserService')
const userModel = require('../../app/models/userModel')

describe('UserService', () => {
  let user = null;

  beforeEach(() => {
    user = new userModel({
      id: 111,
      userName: 'septian',
      accountNumber: 123,
      emailAddress: 'septian@gmail.com',
      identityNumber: 11501,
    })
  })

  describe('#addUser', () => {
    it('should return object user when data saved successfully', async () => {
      user.save = jest.fn().mockReturnValue(user);

      const actualResult = await userService.addUser(user);

      expect(actualResult).toBe(user);
    })

    it('should return error connection when data saved unsuccessfully', async () => {
      user.save = jest.fn().mockRejectedValue('connection lost');

      const actualResult = await userService.addUser(user);

      expect(actualResult).toBe('connection lost');
    })
  })

  describe('#updateUser', () => {
    it('should return modifiedCount equal to 1 when data updated successfully', async () => {
      const expectedResult = 1;
      userModel.updateOne = jest.fn().mockReturnValue({modifiedCount: 1});

      const actualResult = await userService.updateUser(user);

      expect(actualResult.modifiedCount).toBe(expectedResult);
    })

    it('should return error connection when data updated unsuccessfully', async () => {
      userModel.updateOne = jest.fn().mockRejectedValue('connection lost');

      const actualResult = await userService.updateUser(user);

      expect(actualResult).toBe('connection lost');
    })
  })

  describe('#deleteUser', () => {
    it('should return deletedCount equal to 1 when data deleted successfully', async () => {
      const expectedResult = 1;
      userModel.deleteOne = jest.fn().mockReturnValue({deletedCount: 1});

      const actualResult = await userService.deleteUser(user.id);

      expect(actualResult.deletedCount).toBe(expectedResult);
    })

    it('should return error connection when data deleted unsuccessfully', async () => {
      userModel.deleteOne = jest.fn().mockRejectedValue('connection lost');

      const actualResult = await userService.deleteUser(user.id);

      expect(actualResult).toBe('connection lost');
    })
  })

  describe('#fetchUserByAccountNumber', () => {
    it('should return one user when user found', async () => {
      userModel.findOne = jest.fn().mockReturnValue(user);

      const actualResult = await userService.fetchUserByAccountNumber(user.accountNumber);

      expect(actualResult).toBe(user);
    })

    it('should return error connection when get connection issue', async () => {
      userModel.findOne = jest.fn().mockReturnValue('connection lost');

      const actualResult = await userService.fetchUserByAccountNumber(user.accountNumber);

      expect(actualResult).toBe('connection lost');
    })
  })

  describe('#fetchUserByIdentityNumber', () => {
    it('should return one user when user found', async () => {
      userModel.findOne = jest.fn().mockReturnValue(user);

      const actualResult = await userService.fetchUserByIdentityNumber(user.identityNumber);

      expect(actualResult).toBe(user);
    })

    it('should return error connection when get connection issue', async () => {
      userModel.findOne = jest.fn().mockRejectedValue('connection lost');

      const actualResult = await userService.fetchUserByIdentityNumber(user.identityNumber);

      expect(actualResult).toBe('connection lost');
    })
  })

  describe('#getAllUser', () => {
    it('should return all user when get all user succeed', async () => {
      const arrayObject = [user];
      userModel.find = jest.fn().mockReturnValue(arrayObject);

      const actualResult = await userService.getAllUser();

      expect(actualResult).toStrictEqual(arrayObject);
    })

    it('should return error connection when get connection issue', async () => {
      userModel.find = jest.fn().mockRejectedValue('connection lost');

      const actualResult = await userService.getAllUser();

      expect(actualResult).toBe('connection lost');
    })
  })
})
