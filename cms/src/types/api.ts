export type Login = {
    email: string;
    password: string;
}

export type ProductType = {
    name: string;
    description: string;
    group: string;
}

export type ProductGroup = {
    name: string;
    description: string;
}

export type Tier = {
    name: string;
    description: string;
    isActive: boolean;
}