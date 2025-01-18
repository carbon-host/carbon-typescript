import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type { FileInfo } from "./types";

export class FileManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

    private async fetchFiles(directory: string) {
        return this.axios.get<FileInfo[]>(`/files?path=${directory}`).then(res => res.data)
    }

    async getFiles(directory: string) {
        return await this.fetchFiles(directory)
    }

    async getFile(path: string) {
        return this.axios.get<{ content?: string, imageSrc?: string }>(`/files/content?path=${path}`).then(res => res.data)
    }

    async saveFile(path: string, content: string) {
        return this.axios.put("/files/write", { path, content })
    }


    async moveFiles(path: string, files: { from: string, to: string }[]) {
        return this.axios.post("/files/move", { path, files })
    }

    async renameFile(path: string, name: string) {
        return this.axios.put("/files/rename", { path, name })
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

    async decompressFile(root: string, file: string) {
        return this.axios.post("/files/decompress", { root, file })
    }

    async compressFiles(root: string, files: string[]) {
        return this.axios.post("/files/compress", { root, files })
    }
}