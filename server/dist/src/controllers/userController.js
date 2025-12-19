import { prisma } from "../prisma.js";
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error returning users" });
    }
};
//# sourceMappingURL=userController.js.map