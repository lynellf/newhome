import ReactDOM from 'react-dom';
import './styles/css/styles.css';
import { routes } from './components/router';
import registerServiceWorker from './registerServiceWorker';

const router = routes();

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
