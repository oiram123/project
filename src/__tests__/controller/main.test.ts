import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { mainApp } from '../../controllers/main';

// Mocks
const mockRequest = (body: any) => ({ body });
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext: NextFunction = jest.fn();

// Mock helpers
jest.mock('../../helpers/isPrimeNumber', () => {
  return jest.fn((number: number) => number !== 1 && number % 2 !== 0);
});

jest.mock('../../helpers/isPalindromeNumber', () => {
  return jest.fn((number: number) => {
    const str = String(number);
    const reversed = str.split('').reverse().join('');
    return str === reversed;
  });
});

describe('mainApp controller', () => {
  test('handles valid input and returns data', () => {
    const req = mockRequest({ minNumber: 1, maxNumber: 10, feature: [121, 5, 3] });
    const res = mockResponse();

    mainApp(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', true);
    expect(res.json.mock.calls[0][0]).toHaveProperty('data');
    expect(res.json.mock.calls[0][0]).toHaveProperty('timeOfExecution');
  });

  test('handles invalid input and returns error', () => {
    const req = mockRequest({ minNumber: 10, maxNumber: 1, feature: [1, 4, 6] });
    const res = mockResponse();

    mainApp(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error');
  });

  test('handles invalid numbers and returns error', async () => {
    const req = mockRequest({ minNumber: 1, maxNumber: 10, feature: [1, 23, 31] });
    const res = mockResponse();

    mainApp(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'These numbers are not palindrome or prime numbers: 1');
  });


  test('handles invalid numbers and returns error', async () => {
    const req = mockRequest({ minNumber: -1, maxNumber: 10, feature: [232, 5, 3] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);
    mainApp(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Minimum number must be a positive integer');
  });

  // test('handles invalid numbers and returns error', async () => {
  //   const req = mockRequest({ minNumber: 1, maxNumber: -2, feature: [232, 5, 3] });
  //   const res = mockResponse();

  //   validateRequest(req as Request, res as Response, mockNext as NextFunction);
  //   mainApp(req as Request, res as Response, mockNext as NextFunction);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalled();
  //   expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
  //   expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Maximum number must be a positive integer');
  // });

});



