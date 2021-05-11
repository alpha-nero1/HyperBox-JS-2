const hyperbox = require("./hyperbox");

function boxToObject(type, props, ...children) {
    return { type, props: props || {}, children };
}

const extractEventName = (name) => {
    return name.slice(2).toLowerCase();
}

const isEventProp = (name) => {
    return /^on/.test(name);
}

const isCustomProp = (name) => {
    return isEventProp(name) || name === 'forceUpdate';
}

const addEventListeners = (target, props = {}) => {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
          target.addEventListener(
            extractEventName(name),
            props[name]
          );
        }
    });
}

const setBoolProp = (target, name, value) => {
    if (value) {
        target.setAttribute(name, value);
        target[name] = true;
    } else {
        target[name] = false;
    }
}

const setStyleProps = (target, props) => {
    Object.keys(props).forEach(propKey => {
        console.log('aa setting: ', propKey, props[propKey]);
        target.style[propKey] = props[propKey];
    });
}

const setProp = (target, name, value) => {
    if (isCustomProp(name)) return;
    if (name === 'className') {
        target.setAttribute('class', value);
    } else if (name === 'style' && typeof value === 'object') {
        setStyleProps(target, value);
    } else if (typeof value === 'boolean') {
        setBoolProp(target, name, value);
    } else {
        target.setAttribute(name, value);
    }
}

const setProps = (target, props) => {
    if (!props) return;
    Object.keys(props).forEach(prop => {
        setProp(target, prop, props[prop]);
    });
}

const createElement = (node) => {
    if (typeof node === 'undefined') return;
    if (typeof node !== 'function' && typeof node !== 'object') return document.createTextNode('' + node);
    const { type: nodeType } = node;
    // If the node type is a function then we need to go one step further to get the node.
    if (typeof nodeType === 'function') return createBox(nodeType, node.props);
    const element = document.createElement(nodeType);
    setProps(element, node.props);
    addEventListeners(element, node.props);
    if (node.children) node.children
        .map(createElement)
        .forEach(child => {
            if (child) element.appendChild(child)
        });
    return element;
}

const propsAreEqual = (nodeOne, nodeTwo) => {
    const combined = { ...nodeOne.props, ...nodeTwo.props };
    let areEqual = true;
    const keys = Object.keys(combined);
    if (keys.length) areEqual = !keys.some((key) => (nodeOne.props[key] !== nodeTwo.props[key]));
    return areEqual;
}

const detectChanges = (element, it = 0) => {
    if (!element) return;
    if (element._encapsulated) {
        const { func, props, node } = element._encapsulated;
        const newBox = createBox(func, props);
        if (it === 0 || !propsAreEqual(node, newBox._encapsulated.node)) {
            element.parentElement.replaceChild(newBox, element);
        } else {
            return;
        }
    }
    element.childNodes.forEach((el) => detectChanges(el, it + 1))
}

const runChangeDetection = () => {
    detectChanges(document.getElementById('root').firstChild)
}

const createBox = (func, props) => {
    const context = { ...props }
    const boxContents = func(context);
    const box = boxToObject(func.name, props, boxContents)
    const el = createElement(box);
    context.element = el;
    context.func = func;
    el._encapsulated = {
        func,
        props,
        node: box
    }
    return el;
}

module.exports = { createBox, runChangeDetection }