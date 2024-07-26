import {
  createCollectionService,
  deleteCollectionService,
  getCollectionByNameService,
  getCollectionsService,
  updateCollectionService,
} from "./service.js";

export const addMetadataCollection = async (req, res) => {
  try {
    const collectionData = req.body;
    const newCollection = await createCollectionService(collectionData);
    res.status(201).send(newCollection);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
};

export const getAllMetadataCollections = async (req, res) => {
  try {
    const collections = await getCollectionsService();
    res.status(200).send(collections);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
};

export const getMetadataCollectionByName = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const collection = await getCollectionByNameService({ collectionName });
    res.status(200).send(collection);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
};

export const updateMetadataCollection = async (req, res) => {
  try {
    const collectionData = req.body;
    const response = await updateCollectionService(collectionData);
    res.status(response.status).send({ message: response.message });
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
};

export const deleteMetadataCollection = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const response = await deleteCollectionService({ collectionName });
    res.status(response.status).send({ message: response.message });
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
};
