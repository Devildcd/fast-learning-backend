import asyncHandler from "express-async-handler";

import {
    getAllLinks,
    getLinkById,
    createLink,
    updateLink,
    deleteLink,
  } from "../services/link.service.js";
  
  export const getLinks = asyncHandler( async(req, res) => {
      const {page = 1, limit = 10} = req.query;
      const result = await getAllLinks(Number(page), Number(limit));
      res.json(result);
  });
  
  export const getLink = asyncHandler( async(req, res) => {
      const link = await getLinkById(req.params.id);
      if(!link) {
          res.status(404);
          throw new Error("Link not found");
      }
  
      res.json(link);
  });
  
  export const storeLink = asyncHandler( async(req, res) => {
      const { technology_id, title, url, description, is_official } = req.body;
      if(!technology_id || !title || !url || !description || !is_official) {
          res.status(400);
          throw new Error("All fields are required");
      }
  
      const newLink = await createLink({technology_id, title, url, description, is_official});
      res.status(201).json(newLink);
  });
  
  export const editLink = asyncHandler( async(req, res) => {
      const updatedLink = await updateLink(req.params.id, req.body);
      if(!updateLink) {
          res.status(404);
          throw new Error("Link not found");
      }
  
      res.json(updatedLink);
  });
  
  export const destroyLink = asyncHandler( async(req, res) => {
      const deletedLink = await deleteLink(req.params.id);
      if(!deletedLink) {
          res.status(404);
          throw new Error("Link not found");
      }
  
      res.json({ message: "Link deleted successfully" });
  });