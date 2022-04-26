import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

// Caminho da pasta temporária padrão das imagens
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

type IUploadConfig = {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: any;
    aws: {
      bucket: string;
    };
  };
};

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  // Caminho da pasta dos uploads final das imagens
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      // Tratativa do envio da imagem
      filename(request, file, callback) {
        // Cria um hash de 2 Bytes Hexadecimal
        const fileHash = crypto.randomBytes(2).toString('hex');
        // Recebe a variável com o hash e o nome original do arquivo
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'images-apigobarber',
    },
  },
} as IUploadConfig;
