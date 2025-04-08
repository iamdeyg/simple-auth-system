import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthService {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ userId: number }> {
    const hashedPassword = await hashPassword(password);
    try {
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return { userId: user.id };
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Username or email already exists");
        }
      }
      throw new Error("Registration failed");
    }
  }
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    return { token };
  }
}
