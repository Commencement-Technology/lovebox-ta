require('dotenv').config();
import { app, redisClient } from './server';

redisClient
    .connect()
    .then(() =>
        consola.ready({
            message: 'Redis client is connected successfully',
            badge: true,
        })
    )
    .catch(error =>
        consola.error({
            message: `An error occured when connecting Redis client ${error}`,
            badge: true,
        })
    );
app.listen(parseInt(process.env.SERVER_PORT), () => {
    consola.ready({
        message: `🚀 Server ready at http://localhost:${process.env.SERVER_PORT}`,
        badge: true,
    });
});

if (module.hot) {
    module.hot.accept();
}
