import { Request, Response, NextFunction } from "express";
import { performance } from "perf_hooks";
import asyncHandler from "../middleware/asyncHandler";
import isPrimeNumber from "../helpers/isPrimeNumber";
import isPalindromeNumber from "../helpers/isPalindromeNumber";

interface RequestBody {
  minNumber: number;
  maxNumber: number;
  feature: number[];
}

interface NumberInfo {
  primes: number[];
  palindromes: number[];
  invalidNumbers: number[];
}

export const mainApp = asyncHandler(
  async (
    req: Request<{}, {}, RequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const startOfExecution: number = performance.now()
    const data: RequestBody = req.body
    const numberInfo: NumberInfo = {
      primes: [],
      palindromes: [],
      invalidNumbers: [],
    };

    for (const number of data.feature) {
      if (isPrimeNumber(number)) {
        numberInfo.primes.push(number);
      } else if (number.toString().length > 1 && isPalindromeNumber(number)) {
        numberInfo.palindromes.push(number);
      } else {
        numberInfo.invalidNumbers.push(number);
      }
    }

    if (numberInfo.invalidNumbers.length >= 1) {
      return res.status(400).json({
        success: false,
        error: `These numbers are not palindrome or prime numbers: ${numberInfo.invalidNumbers}`,
      });
    }

    const endOfExecution: number = performance.now();

    res.status(200).json({
      success: true,
      data: [...numberInfo?.primes, ...numberInfo?.palindromes],
      timeOfExecution: endOfExecution-startOfExecution, //milliseconds
    });
  }
)
