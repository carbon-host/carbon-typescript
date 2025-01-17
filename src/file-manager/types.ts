export type FileInfo = {
  name: string;
  mode: string;
  size: number;
  isFile: boolean;
  isSymlink: boolean;
  isEditable: boolean;
  mimetype: string;
  createdAt: string;
  modifiedAt: string;
};

// export type FetchedFileInfo = {
//   name: string;
//   mode: string;
//   size: number;
//   isFile: boolean;
//   isSymlink: boolean;
//   isEditable: boolean;
//   mimetype: string;
//   createdAt: string;
//   modifiedAt: string;
// };

// export type ListFilesResponse = {
//   directories: FetchedFileInfo[];
//   files: FetchedFileInfo[];
// };