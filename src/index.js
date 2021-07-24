import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import './database';

app.listen(app.get('port'), '192.168.1.5')
console.log(`Server listening on http://192.168.1.5:${app.get('port')}`);