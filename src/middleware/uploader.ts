import multer, { StorageEngine } from 'multer';
import ApiError from '../utils/helper/ApiError';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const maxFileSize = 50 * 1024 * 1024; // 50 MB
const allowedFileTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/svg+xml',
	'image/svg',
	'text/xml',
	'application/xml',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'video/mp4',
	'video/x-msvideo',
	'video/x-matroska',
	'video/webm',
	'video/ogg',
	'video/quicktime',
];

const createFolder = (folderPath: string): void => {
	if (!existsSync(folderPath)) {
		try {
			mkdirSync(folderPath, { recursive: true });
		} catch (err) {
			throw new Error(
				`Failed to create folder at ${folderPath}: ${
					err instanceof Error ? err.message : 'Unknown error'
				}`
			);
		}
	}
};

const storage = (folderName: string = 'asset'): StorageEngine =>
	multer.diskStorage({
		destination: (
			req,
			file,
			cb: (error: Error | null, destination: string) => void
		): void => {
			try {
				const basePath = path.resolve('public');
				createFolder(basePath);
				const targetPath = path.join(basePath, folderName);
				createFolder(targetPath);
				cb(null, targetPath);
			} catch (err) {
				cb(err as Error, '');
			}
		},
		filename: (req, file, cb) => {
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			const ext = path.extname(file.originalname);
			const baseName = path.basename(file.originalname, ext);

			// ✅ Sanitize the filename: remove spaces and unsafe characters
			const safeBaseName = baseName
				.trim()
				.replace(/\s+/g, '-') // replace spaces with dashes
				.replace(/[^a-zA-Z0-9-_]/g, ''); // remove anything not alphanumeric, dash, underscore

			cb(null, `${safeBaseName}-${uniqueSuffix}${ext}`);
		},
	});

const fileFilter =
	(allowedTypes: string[]) =>
	(
		req: Express.Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	): void => {
		const ext = path.extname(file.originalname).toLowerCase();
		const isSvg = ext === '.svg';

		if (allowedTypes.includes(file.mimetype) || isSvg) {
			cb(null, true);
		} else {
			const error = new ApiError(
				400,
				`File type ${file.mimetype} is not allowed`
			);
			cb(error as unknown as null, false);
		}
	};

interface UploaderOptions {
	fileSize?: number;
	[key: string]: unknown;
}

export const uploader = (
	folderName: string = 'uploads',
	allowedTypes: string[] = allowedFileTypes,
	options: UploaderOptions = {}
): multer.Multer => {
	const { fileSize = maxFileSize, ...otherOptions } = options;

	return multer({
		storage: storage(folderName),
		limits: { fileSize },
		fileFilter: fileFilter(allowedTypes),
		...otherOptions,
	});
};
