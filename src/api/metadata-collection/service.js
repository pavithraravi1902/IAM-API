import MetadataCollection from "./model.js";

export const createCollectionService = async (body) => {
  try {
    const existingCollection = await MetadataCollection.findOne({ collectionName: body.collectionName });
    if (existingCollection) {
      const error = new Error('Collection key already exists');
      error.status = 409;
      throw error;
    }
    const newCollection = await MetadataCollection.create(body);
    return newCollection;
  } catch (error) {
    throw error;
  }
};

export const getCollectionByNameService = async (params) => {
  try {
    const collection = await MetadataCollection.findOne({ collectionName: params.collectionName });
    if (!collection) {
      const error = new Error(`Collection with name ${params.collectionName} not found`);
      error.status = 404;
      throw error;
    }
    return collection;
  } catch (error) {
    throw error;
  }
};

export const getCollectionsService = async () => {
  try {
    const collections = await MetadataCollection.find();
    if (collections.length === 0) {
      const error = new Error('No collections found');
      error.status = 404;
      throw error;
    }
    return collections;
  } catch (error) {
    throw error;
  }
};

export const updateCollectionService = async (body) => {
  try {
    const collection = await MetadataCollection.findOne({ collectionName: body.collectionName });
    if (!collection) {
      const error = new Error(`Collection with name ${body.collectionName} not found`);
      error.status = 404;
      throw error;
    }
    const updatedCollection = await MetadataCollection.findOneAndUpdate(
      { collectionName: body.collectionName },
      body,
      { new: true }
    );
    if (!updatedCollection) {
      const error = new Error(`Failed to update ${body.collectionName}`);
      error.status = 500;
      throw error;
    }
    return { status: 200, message: `${body.collectionName} updated successfully` };
  } catch (error) {
    throw error;
  }
};

export const deleteCollectionService = async (params) => {
  try {
    const result = await MetadataCollection.deleteOne({ collectionName: params.collectionName });
    if (result.deletedCount > 0) {
      return { status: 200, message: `${params.collectionName} deleted successfully` };
    } else {
      const error = new Error(`${params.collectionName} not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
