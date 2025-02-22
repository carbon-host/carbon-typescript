export type Port = {
    id: number;
    ip: string;
    port: number;
    notes: string | null;
    isDefault: boolean;
}


export type SFTPDetails = {
    host: string;
    port: number;
    username: string;
    password?: string;
}

export type SFTPAccountDetails = {
    username: string;
    password: string;
}