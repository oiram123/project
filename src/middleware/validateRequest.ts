import { Request, Response, NextFunction } from "express"
import asyncHandler from "../middleware/asyncHandler"

export const validateRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    if (!Number.isInteger(data.minNumber) || data.minNumber <= 0) {
      return res.status(400).json({
        success: false,
        error: "Minimum number must be a positive integer",
      })
    }

    if (!Number.isInteger(data.maxNumber) || data.maxNumber <= 0) {
      return res.status(400).json({
        success: false,
        error: "Maximum  number must be a positive integer",
      })
    }

    if (data.minNumber >= data.maxNumber) {
      return res.status(400).json({
        success: false,
        error: "Minimum number should be smaller than the maximum number",
      })
    }

    if (data.maxNumber <= 0) {
      return res.status(400).json({
        success: false,
        error: "Maximum number should be greater than 0",
      })
    }

    if (data.feature.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Feature must be a non-empty array" })
    }

    next()
  }
)
