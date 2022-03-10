import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Caminho da pasta temporária padrão das imagens
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  // Caminho da pasta dos uploads final das imagens
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

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
};
