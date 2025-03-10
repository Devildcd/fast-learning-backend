import Link from "../models/linkModel.js";

export const getAllLinks = async (page = 1, limit = 10) => {
    try{
        const skip = (page -1) * limit;
        const links = await Link.find().skip(skip).limit(limit);
        const total = await Link.countDocuments();
        return { 
            links, 
            total, 
            page, 
            totalPages: Math.ceil(total / limit)
        };
    } catch(error) {
        console.error("Error fetching links:", error);
        throw new Error("There was an issue retrieving the links.");
    }
};

export const getLinkById = async (id) => {
    try {
        const link = await Link.findById(id);
        if (!link) {
            throw new Error("Link not found");
        }
        return link;
    } catch (error) {
        console.error("Error fetching link by ID:", error);
        throw new Error("There was an issue retrieving the link.");
    }
};

export const createLink = async (data) => {
    try {
        const link = await Link.create(data);
        return link;
    } catch (error) {
        console.error("Error creating link:", error);
        throw new Error("There was an issue creating the link.");
    }
};

export const updateLink = async (id, data) => {
    try {
        const updatedLink = await Link.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedLink) {
            throw new Error("Link not found");
        }
        return updatedLink;
    } catch (error) {
        console.error("Error updating link:", error);
        throw new Error("There was an issue updating the link.");
    }
};

export const deleteLink = async (id) => {
    try {
        const deletedLink = await Link.findByIdAndDelete(id);
        if (!deletedLink) {
            throw new Error("Link not found");
        }
        return deletedLink;
    } catch (error) {
        console.error("Error deleting link:", error);
        throw new Error("There was an issue deleting the link.");
    }
};