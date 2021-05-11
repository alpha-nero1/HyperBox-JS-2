const { updateBox, createBox, runChangeDetection } = require('./hyperbox-core');

const HyperBox = (() => {
    let _val, _deps, _element;
    return {
        useReaction: (callback, depArray) => {
            const hasNoDeps = !depArray
            const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true
            if (hasNoDeps || hasChangedDeps) {
                callback()
                _deps = depArray
            }
        },
        useVars(initialValue) {
            _val = _val || initialValue // assign anew every run
            function setState(newVal) {
              _val = newVal
              runChangeDetection();
            }
            return [_val, setState]
        }
    }
})();

const hyperbox = HyperBox;
hyperbox.createBox = createBox;
hyperbox.updateBox = updateBox;

module.exports = hyperbox;