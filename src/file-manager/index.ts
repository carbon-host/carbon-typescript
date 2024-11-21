import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type { FileInfo, ListFilesResponse } from "./types";

export class FileManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

    private async fetchFiles(directory: string) {
        return this.axios.get<ListFilesResponse>(`/files?path=${directory}`).then(res => res.data)
    }

    async getFiles(directory: string) {
        return convertListFiles(directory, await this.fetchFiles(directory))
    }

    async getFile(path: string) {
        return this.axios.get<{ content?: string, imageSrc?: string }>(`/files/content?path=${path}`).then(res => res.data)
    }

    async saveFile(path: string, content: string) {
        return this.axios.put("/files/write", { path, content })
    }

    async moveFile(sourcePath: string, destinationPath: string) {
        return this.axios.post("/files/move", { source: sourcePath, target: destinationPath })
    }

    async renameFile(path: string, name: string) {
        return this.axios.put("/files/rename", { path, name })
    }

    async extractFile(file: string, target: string) {
        return this.axios.post("/files/extract", { source: file, target })
    }

    async duplicateFile(path: string) {
        return this.axios.post("/files/duplicate", { path })
    }

    async downloadFile(path: string) {
        return this.axios.get("/files/download", { params: { path }, responseType: 'blob' })
    }

    async deleteFile(params: { path?: string, paths?: string[] }) {
        return this.axios.delete("/files", { data: params })
    }

    async createFile(parentDirectory: string, fileName: string) {
        return this.axios.post("/files", {
            type: "file",
            path: `${parentDirectory}/${fileName}`
        })
    }

    async createDirectory(parentDirectory: string, folderName: string) {
        return this.axios.post("/files", {
            type: "directory",
            path: `${parentDirectory}/${folderName}`
        })
    }

    async archiveFiles(params: { target?: string, paths: string[] }) {
        return this.axios.post("/files/archive", {
            method: "zip",
            paths: params.paths,
            target: params.target
        })
    }
}

function convertListFiles(parentDirectory: string, listFilesResponse: ListFilesResponse) {
    const fileList: FileInfo[] = [];

    listFilesResponse.directories.forEach((dir) => {
        fileList.push({
            name: dir.name,
            parentDirectory: parentDirectory,
            isDirectory: true,
            fileType: "directory" as const,
            size: dir.size,
            lastModified: dir.lastModified,
        });
    });

    listFilesResponse.files.forEach((file) => {
        fileList.push({
            name: file.name,
            parentDirectory: parentDirectory,
            isDirectory: false,
            fileType: "file" as const,
            size: file.size,
            lastModified: file.lastModified,
        });
    });

    return fileList;
}