import { SQLiteDatabase, openDatabase } from "expo-sqlite";

export interface IGalleryItem {
  id: number;
  path: string;
}

class GalleryDatabase {
  private static db: SQLiteDatabase = openDatabase("photo.db");

  public static gallery: IGalleryItem[] = [];

  static async init() {
    const query =
      "CREATE TABLE IF NOT EXISTS paths (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT);";

    this.db.transaction((tx) => tx.executeSql(query));
    return;
  }

  static getGallery() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM paths ORDER BY id DESC",
        [],
        (txObj, resultSet) => {
          this.gallery = resultSet.rows._array;
        },
        (txObj, error) => {
          console.log(error.message);
          return true;
        }
      );
    });
  }

  static addMedia(path: string) {
    this.db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO paths (path) VALUES (?)",
        [path],
        (txObj, resultSet) => {
          let existingPaths = [...this.gallery];
          const newMedia = { id: this.gallery.length + 1, path: path };
          existingPaths.unshift(newMedia);
          this.gallery = existingPaths;
        },
        (txObj, error) => {
          console.log(error.message);
          return true;
        }
      );
    });
  }

  static async deleteMedia(id: number) {
    return this.db.transactionAsync(async (tx) => {
      await tx
        .executeSqlAsync("DELETE FROM paths WHERE id = ?", [id])
        .then(() => {
          this.gallery = this.gallery.filter((item) => item.id !== id);
        });
    });
  }
}

export default GalleryDatabase;
