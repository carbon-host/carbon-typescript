export type FileInfo = {
  name: string;
  parentDirectory: string;
  isDirectory: boolean;
  fileType: "file" | "directory";
  size: number;
  lastModified: string;
};

export type FetchedFileInfo = {
  name: string;
  lastModified: string;
  size: number;
};

export type ListFilesResponse = {
  directories: FetchedFileInfo[];
  files: FetchedFileInfo[];
};