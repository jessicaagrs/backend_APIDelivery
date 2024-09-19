import crypto from "crypto";
import { RoleEnum, StatusOrdersEnum, TypeLoginEnum, TypeProductEnum } from "../enums/enums";

function validateStatusOrders(status: string): boolean {
    for (const value in StatusOrdersEnum) {
        if (StatusOrdersEnum[value as keyof typeof StatusOrdersEnum] === status) {
            return true;
        }
    }

    return false;
}

function validateProductType(typeProduct: string): boolean {
    for (const value in TypeProductEnum) {
        if (TypeProductEnum[value as keyof typeof TypeProductEnum] === typeProduct) {
            return true;
        }
    }
    return false;
}

function validateRole(typeRole: string): boolean {
    for (const value in RoleEnum) {
        if (RoleEnum[value as keyof typeof RoleEnum] === typeRole) {
            return true;
        }
    }
    return false;
}

function encryptCustomerPassword(password: string) {
    const keyEnv = process.env.KEY as string;
    const key = Buffer.from(keyEnv, "hex");
    const ivEnv = process.env.IV?.replace(/\s/g, "") as string;
    const iv = Buffer.from(ivEnv, "hex");

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

function decryptCustomerPassword(passwordEncrypt: string) {
    const keyEnv = process.env.KEY as string;
    const key = Buffer.from(keyEnv, "hex");
    const ivEnv = process.env.IV?.replace(/\s/g, "") as string;
    const iv = Buffer.from(ivEnv, "hex");
    const encryptedText = Buffer.from(passwordEncrypt, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function validateAcessPassword(acessPassword: string) {
    if (acessPassword === process.env.ACESS_PASSWORD) {
        return true;
    }

    return false;
}

function validateTypeLogin(typeLogin: string) {
    for (const value in TypeLoginEnum) {
        if (TypeLoginEnum[value as keyof typeof TypeLoginEnum] === typeLogin) {
            return true;
        }
    }
    return false;
}

function generateRandomPasswordReset() {
    return Math.random().toString(36).slice(-8);
}

function validateDateByRequest(date: string) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    return null;
}

export {
    decryptCustomerPassword,
    encryptCustomerPassword,
    generateRandomPasswordReset,
    validateAcessPassword,
    validateDateByRequest,
    validateProductType,
    validateRole,
    validateStatusOrders,
    validateTypeLogin,
};
