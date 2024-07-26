import express from "express";
import {
  addMetadataCollection,
  deleteMetadataCollection,
  getAllMetadataCollections,
  getMetadataCollectionByName,
  updateMetadataCollection,
} from "./controller.js";

const router = express.Router();

router.post("/", addMetadataCollection);
router.get("/", getAllMetadataCollections);
router.get("/:collectionName", getMetadataCollectionByName);
router.put("/:collectionName", updateMetadataCollection);
router.delete("/:collectionName", deleteMetadataCollection);

export default router;
