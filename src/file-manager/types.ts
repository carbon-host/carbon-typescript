export type FileInfo = {
  name: string;
  mode: string;
  size: number;
  isFile: boolean;
  isSymlink: boolean;
  mimetype: string;
  createdAt: string;
  modifiedAt: string;
};

export type ChmodOptions = {
  path: string,
  files: {
    file: string,
    mode: number,
  }[]
};

