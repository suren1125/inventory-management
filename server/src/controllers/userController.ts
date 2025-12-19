import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error returning users" });
  }
};
