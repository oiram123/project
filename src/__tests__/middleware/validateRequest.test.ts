import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
// Mocks
const mockRequest = (body: any) => ({ body });
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext: NextFunction = jest.fn();

describe('validateRequest middleware', () => {
  // test('validates request with correct input', async () => {
  //   const req = mockRequest({ minNumber: 1, maxNumber: 10, feature: [2, 3, 5] });
  //   const res = mockResponse();

  //   validateRequest(req as Request, res as Response, mockNext as NextFunction);

  //   expect(res.status).toHaveBeenCalled();
  //   expect(mockNext).toHaveBeenCalled();
  // });

  //minnumber not integer
  test('handles invalid minNumber', () => {
    const req = mockRequest({ minNumber: 'abc', maxNumber: 10, feature: [2, 3, 5] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Minimum number must be a positive integer');
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('handles invalid minNumber', async () => {
    const req = mockRequest({ minNumber: -1, maxNumber: 10, feature: [2, 3, 5] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Minimum number must be a positive integer');
    expect(mockNext).not.toHaveBeenCalled(); 
  });

  //maximum number not integer 
  test('handles invalid minNumber', () => {
    const req = mockRequest({ minNumber: 1, maxNumber: 'abc', feature: [2, 3, 5] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Maximum  number must be a positive integer');
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('handles invalid minNumber', async () => {
    const req = mockRequest({ minNumber: 1, maxNumber: -1, feature: [2, 3, 5] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Maximum  number must be a positive integer');
    expect(mockNext).not.toHaveBeenCalled(); 
  });


  test('handles invalid minNumber', async () => {
    const req = mockRequest({ minNumber: 5, maxNumber: 1, feature: [2, 3, 5] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Minimum number should be smaller than the maximum number');
    expect(mockNext).not.toHaveBeenCalled(); 
  });

  test('handles non-empty array', async () => {
    const req = mockRequest({ minNumber: 1, maxNumber: 10, feature: [] });
    const res = mockResponse();

    validateRequest(req as Request, res as Response, mockNext as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0]).toHaveProperty('success', false);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error', 'Feature must be a non-empty array');
    expect(mockNext).not.toHaveBeenCalled(); 
  });
});





