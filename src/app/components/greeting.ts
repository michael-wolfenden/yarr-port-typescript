import {h} from 'virtual-dom';
import {Observable} from 'rx';

const view = h(
    'h1',
    {},
    ['Hello World']
);

const viewSteam = () => Observable.return(view);

export default viewSteam;
