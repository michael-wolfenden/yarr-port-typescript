/// <reference path='../../typings/tsd.d.ts'/>

import {h, create, diff, patch} from 'virtual-dom';
import {Observable} from 'rx';

const render = (count: number) => h(
    'h1',
    { className: 'hello-world' },
    ['Hello World ', String(count)]
);

let view = render(0);
let rootNode = create(view);

document.body.appendChild(rootNode);

Observable
    .interval(1000)
    .map(n => render(n + 1))
    .subscribe(newView => {
        let patches = diff(view, newView);
        rootNode = patch(rootNode, patches);
        view = newView;
    });
