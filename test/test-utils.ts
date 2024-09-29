import { prismaClient } from "../src/application/database";

export class UserTest {
    static async delete(username: string) {
        await prismaClient.user.deleteMany({
            where: {
                username
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                name: "nayandra kastoro",
                username: "nayandra",
                password: "admin123"
            }
        })
    }
}