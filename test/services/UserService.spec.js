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
    jest.resetAllMocks();
  })

  describe('#addUser', () => {
    it('should return object user when data saved successfully', async () => {
      jest.spyOn(userModel.prototype, 'save')
        .mockImplementationOnce(() => Promise.resolve(user));
      userModel.find = jest.fn().mockReturnValue([]);

      await userService.addUser(user, (err, result) => {
        expect(result).toBe(user);
      });
    })

    it('should return error system error when data saved unsuccessfully', async () => {
      jest.spyOn(userModel.prototype, 'save')
        .mockImplementationOnce(() => Promise.reject('connection lost'));
      userModel.find = jest.fn().mockReturnValue([]);

      await userService.addUser(user, (err, result) => {
        expect(result).toBe('System Error');
      });
    })
  })

  describe('#updateUser', () => {
    it('should return modifiedCount equal to 1 when data updated successfully', async () => {
      const expectedResult = 1;
      userModel.updateOne = jest.fn().mockReturnValue({modifiedCount: 1});
      userModel.find = jest.fn().mockReturnValue([user]);

      const actualResult = await userService.updateUser(user.id,user);

      expect(actualResult.modifiedCount).toBe(expectedResult);
    })

    it('should return error connection when data updated unsuccessfully', async () => {
      userModel.updateOne = jest.fn().mockRejectedValue('connection lost');
      userModel.find = jest.fn().mockReturnValue([user]);

      const actualResult = await userService.updateUser(user.id,user);

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

  describe('#getUser', () => {
    it('should return one user when get user by identityNumber succeed', async () => {
      userModel.findOne = jest.fn().mockReturnValue(user);
      const requestQuery = {
        identityNumber: user.identityNumber
      }

      const actualResult = await userService.getUser(requestQuery);

      expect(actualResult).toBe(user);
    })

    it('should return one user when get user by accountNumber succeed', async () => {
      userModel.findOne = jest.fn().mockReturnValue(user);
      const requestQuery = {
        accountNumber: user.accountNumber
      }

      const actualResult = await userService.getUser(requestQuery);

      expect(actualResult).toBe(user);
    })

    it('should return all user when get user without query param', async () => {
      userModel.find = jest.fn().mockReturnValue(user);

      const actualResult = await userService.getUser();

      expect(actualResult).toBe(user);
    })
  })
})
