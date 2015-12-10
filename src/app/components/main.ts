import {h, VNode} from 'virtual-dom';
import {Observable} from 'rx';

import greetingViewSteam from './greeting';
import counterViewStream from './counter';

const view = (counterView: VNode, greetingView: VNode) => {
    return h(
        'div',
        { className: 'container' },
        [
            greetingView,
            counterView,
        ]
    );
};

const viewStream = () => Observable
    .combineLatest(
        counterViewStream(),
        greetingViewSteam(),
        view
    );

export default viewStream;
