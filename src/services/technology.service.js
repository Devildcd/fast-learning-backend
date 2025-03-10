import Technology from "../models/technologyModel.js";

export const getAllTechnologies  = async (page=1, limit=10) => {
    try {
        const skip = (page - 1) * limit;
        const technologies = await Technology.find().skip(skip).limit(limit);
        const total = await Technology.countDocuments();
        return { 
            technologies, 
            total, 
            page, 
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error("Error fetching technologies:", error);
        throw new Error("There was an issue retrieving the technologies.");
    }
};

export const getTechnologyById = async (id) => {
    try {
        const technology = await Technology.findById(id);
        if (!technology) {
            throw new Error("Technology not found");
        }
        return technology;
    } catch (error) {
        console.error("Error fetching technology by ID:", error);
        throw new Error("There was an issue retrieving the technology.");
    }
};

export const createTechnology = async (data) => {
    try {
        const technology = await Technology.create(data);
        return technology;
    } catch (error) {
        console.error("Error creating technology:", error);
        throw new Error("There was an issue creating the technology.");
    }
};

export const updateTechnology = async (id, data) => {
    try {
        const updatedTechnology = await Technology.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedTechnology) {
            throw new Error("Technology not found");
        }
        return updatedTechnology;
    } catch (error) {
        console.error("Error updating technology:", error);
        throw new Error("There was an issue updating the technology.");
    }
};

export const deleteTechnology = async (id) => {
    try {
        const deletedTechnology = await Technology.findByIdAndDelete(id);
        if (!deletedTechnology) {
            throw new Error("Technology not found");
        }
        return deletedTechnology;
    } catch (error) {
        console.error("Error deleting technology:", error);
        throw new Error("There was an issue deleting the technology.");
    }
};