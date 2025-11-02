import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export function applySecurity(app: Express) {
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(rateLimit({ windowMs: 60_000, max: 120 })); // 120 req/min
}
