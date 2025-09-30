"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
function imageFileFilter(req, file, cb) {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Only image files'), false);
    }
    cb(null, true);
}
exports.multerConfig = {
    storage,
    fileFilter: imageFileFilter,
};
//# sourceMappingURL=multer.config.js.map