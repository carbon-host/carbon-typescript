export type Backup = {
    _id: string;
    uuid: string;
    starId: string;

    name: string;
    description?: string;

    starType: string;
    starVersion?: string; // Don't show for CUSTOM jars

    bytes: number;
    checksum: string;
    ignoredFiles: string[];
    locked: boolean;
    successful: boolean;

    completedAt: Date | null;
    createdAt: Date;
}

export type CreateBackup = {
    name: string;
    description?: string;
    ignored?: string[];
    isLocked?: boolean;
}