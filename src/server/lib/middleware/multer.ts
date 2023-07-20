import multer from 'multer';
import path from 'path';
import { CONSTANT } from '../../utils/V1/constants/constant';

const fileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, CONSTANT.FILE_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        );
    },
});
const fileUpload = multer({ storage: fileStorage }).single('file');

export const multerUpload = {
    fileUpload
}