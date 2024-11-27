export type Backup = {
    _id: string;

    type: "snapshot" | "backup";
    starId?: string;
    ownerId?: string;

    snapshotFolderName: string;
    snapshotName: string;
    snapshotDescription?: string;
    snapshotSize: number;

    bucketName: string;

    createdAt: Date;
}