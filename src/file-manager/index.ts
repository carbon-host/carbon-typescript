
import type { AxiosInstance } from "axios";
import type {CarbonStar} from "../carbon-star";
import type {FileInfo, ListFilesResponse} from "./types";

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