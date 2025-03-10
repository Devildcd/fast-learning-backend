import asyncHandler from "express-async-handler";

import {
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "../services/technology.service.js";

export const getTechnologies = asyncHandler( async(req, res) => {
    const {page = 1, limit = 10} = req.query;
    const result = await getAllTechnologies(Number(page), Number(limit));
    res.json(result);
});

export const getTechnology = asyncHandler( async(req, res) => {
    const technology = await getTechnologyById(req.params.id);
    if(!technology) {
        res.status(404);
        throw new Error("Technology not found");
    }

    res.json(technology);
});

export const storeTechnology = asyncHandler( async(req, res) => {
    const { name, type, description } = req.body;
    if(!name || !type || !description) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const newTechnology = await createTechnology({name, type, description});
    res.status(201).json(newTechnology);
});

export const editTechnology = asyncHandler( async(req, res) => {
    const updatedTechnology = await updateTechnology(req.params.id, req.body);
    if(!updateTechnology) {
        res.status(404);
        throw new Error("Technology not found");
    }

    res.json(updatedTechnology);
});

export const destroyTechnology = asyncHandler( async(req, res) => {
    const deletedTechnology = await deleteTechnology(req.params.id);
    if(!deletedTechnology) {
        res.status(404);
        throw new Error("Technology not found");
    }

    res.json({ message: "Technology deleted successfully" });
});