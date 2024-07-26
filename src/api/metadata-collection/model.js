import mongoose, { Schema } from "mongoose";

const Items = new Schema({
  optionKey: {
    type: String,
    required: true,
  },
  optionValue: {
    type: String,
    required: true,
  },
});

const metadataCollectionItem = new Schema({
  collectionName: {
    type: String,
    required: true,
    unique: true,
  },
  collectionItem: [Items],
});

const MetadataCollection = mongoose.model(
  "MetadataCollection",
  metadataCollectionItem
);

export default MetadataCollection;
