import 'dotenv/config';
import app from './src/app.js';
import './src/db.js';

const port = app.get('port');

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
