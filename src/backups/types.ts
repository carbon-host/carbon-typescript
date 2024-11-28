export type Backup = {
    _id: string;

    type: "snapshot" | "backup";
    ownerId?: string;
    starId?: string;
    starType?: string;
    starVersion?: string;

    snapshotFolderName: string;
    snapshotName: string;
    snapshotDescription?: string;
    snapshotSize: number;

    bucketName: string;

    createdAt: Date;
}