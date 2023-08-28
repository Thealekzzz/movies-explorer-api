import { errors } from 'celebrate';

import error from './middlewares/error.js';
import indexRouter from './routers/index.js';
import limiter from './middlewares/limiter.js';
import { app } from './config.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';

app.use(requestLogger);
app.use(limiter);

app.use(indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(process.env.PORT || 3000);
