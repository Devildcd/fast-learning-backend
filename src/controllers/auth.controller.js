import asyncHandler from "express-async-handler";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirmed, role } = req.body;
  await registerUser(name, email, password, passwordConfirmed, role, );
  res.status(201).json({ message: "User registered successfully" });
});

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const accessToken = await loginUser(email, password, res);
    res.json({message: "Logged In", accessToken});
});

export const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const newAccessToken = await refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  });
  
  export const logout = asyncHandler(async (req, res) => {
    await logoutUser(res, req.user);
    res.json({ message: "Logged out" });
  });