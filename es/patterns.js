var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { toEventObject } from './actions';
export function toggle(onState, offState, eventType) {
    var _a, _b, _c;
    return _a = {}, _a[onState] = {
        on: (_b = {}, _b[eventType] = offState, _b)
    }, _a[offState] = {
        on: (_c = {}, _c[eventType] = onState, _c)
    }, _a;
}
var defaultSequencePatternOptions = {
    nextEvent: 'NEXT',
    prevEvent: 'PREV'
};
export function sequence(items, options) {
    var resolvedOptions = __assign({}, defaultSequencePatternOptions, options);
    var states = {};
    var nextEventObject = resolvedOptions.nextEvent === undefined ? undefined : toEventObject(resolvedOptions.nextEvent);
    var prevEventObject = resolvedOptions.prevEvent === undefined ? undefined : toEventObject(resolvedOptions.prevEvent);
    items.forEach(function (item, i) {
        var state = {
            on: {}
        };
        if (i + 1 === items.length) {
            state.type = 'final';
        }
        if (nextEventObject && i + 1 < items.length) {
            state.on[nextEventObject.type] = items[i + 1];
        }
        if (prevEventObject && i > 0) {
            state.on[prevEventObject.type] = items[i - 1];
        }
        states[item] = state;
    });
    return {
        initial: items[0],
        states: states
    };
}