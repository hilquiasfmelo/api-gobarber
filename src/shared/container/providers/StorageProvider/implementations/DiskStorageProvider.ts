import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import { IStorageProvider } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // Move o arquivo para outra pasta
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // Une o caminho do arquivo com o próprio arquivo da imagem
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      // Verifica se já existe um avatar para o usuário.
      await fs.promises.stat(filePath);
    } catch {
      /**
       * Se não existe avatar a função para e não retorna nada.
       * A mesma nesse caso aqui não precisará executar nada.
       */
      return;
    }

    // Remove o avatar do usuário para outro avatar ser adicionado.
    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
