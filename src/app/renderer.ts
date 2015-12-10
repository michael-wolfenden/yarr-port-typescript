import {create, diff, patch, VNode} from 'virtual-dom';
import {Observable} from 'rx';

let render = (mainViewSteam: Observable<VNode>, baseDOMNode: HTMLElement) => {
    let view = null;
    let rootNode = null;

    let initialize = (newView) => {
        view = newView;
        rootNode = create(view);
        baseDOMNode.appendChild(rootNode);
    };

    let update = (newView) => {
        let patches = diff(view, newView);
        rootNode = patch(rootNode, patches);
        view = newView;
    };

    return mainViewSteam
        .subscribe(
            newView => view
                ? update(newView)
                : initialize(newView),
            error => console.warn('Error occured somewhere along Observable chain', error)
        );
};

export default render;
