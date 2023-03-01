import { Router } from 'express'
import { sample_promts, sample_tags } from '../data'
import asyncHandler from 'express-async-handler';

import { PromtModel } from '../models/promt.model'

const router = Router()

router.get("/seed", asyncHandler(
   async (req, res) => {
      const foodsCount = await PromtModel.countDocuments();
      if(foodsCount> 0){
        res.send("Seed is already done!");
        return;
      }
      await PromtModel.create(sample_promts);
      res.send("Seed Is Done!");
  }
))

router.get("/", asyncHandler( async (req,res) => {
  const promts = await PromtModel.find()
  res.send(promts)
  //res.send(sample_foods)
}))

router.get("/:promtId", asyncHandler(async (req,res) => {
  const promt = await PromtModel.findById(req.params.promtId)
  res.send(promt)
})
)

export default router