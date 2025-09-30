import * as multer from 'multer';
import { Request } from 'express';
declare function imageFileFilter(req: Request, file: Express.Multer.File, cb: any): any;
export declare const multerConfig: {
    storage: multer.StorageEngine;
    fileFilter: typeof imageFileFilter;
};
export {};
