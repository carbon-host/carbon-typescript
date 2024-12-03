export type Backup = {
    _id: string;

    ownerId: string;
    starId: string;

    name: string;
    description?: string;

    starType: string;
    starVersion?: string; // Don't show for CUSTOM jars

    s3: {
        key: string; // Path to the backup (archive name)
        size: number; // Bytes
        bucket: string;
    },

    createdAt: Date;
}