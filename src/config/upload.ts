import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      // Cria um hash de 2 Bytes Hexadecimal
      const fileHash = crypto.randomBytes(2).toString('hex');
      // Recebe a variável com o hash e o nome original do arquivo
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
