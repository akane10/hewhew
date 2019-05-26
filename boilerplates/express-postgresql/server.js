const app = require('./app');
const { dbConn } = require('./config/db');

// connect db
dbConn.connectDB();

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`magic happens on port ${port}`));
