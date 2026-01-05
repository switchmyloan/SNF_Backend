import { Request } from 'express';

export function getClientIpAddress(req: Request): string {
    const ipAddress = req.headers['x-forwarded-for']
        ? (req.headers['x-forwarded-for'] as string).split(',')[0]
        : req.socket?.remoteAddress;
    return ipAddress === '::1' || !ipAddress ? '127.0.0.1' : ipAddress;
}
