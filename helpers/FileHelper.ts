import * as FileSystem from "expo-file-system";

export class FileHelper {
  static readonly path = FileSystem.documentDirectory;

  static async saveFile(uri: string, fileName: string) {
    await FileSystem.copyAsync({ from: uri, to: this.path + fileName });
  }

  static async createDirectory(path: string) {
    if (FileSystem.documentDirectory == null) return;
    await FileSystem.makeDirectoryAsync(path + path);
  }

  static async readDirectory(directoryPath: string) {
    if (this.path == null) return;

    const data = await FileSystem.readDirectoryAsync(this.path + directoryPath);
    return data;
  }

  static async deleteFile(fileName: string) {
    if (FileSystem.documentDirectory == null) return;
    await FileSystem.deleteAsync(this.path + fileName);
  }
}
