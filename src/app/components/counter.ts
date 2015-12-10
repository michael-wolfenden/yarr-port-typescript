import {h} from 'virtual-dom';
import {Observable} from 'rx';

const view = (count: number) => h(
    'h1',
    {},
    [count.toString()]
);

const viewStream = () => Observable
    .interval(1000)
    .map(n => n + 1)
    .startWith(0)
    .map(count => view(count));

export default viewStream;
