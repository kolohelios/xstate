import { StateNode, State } from './index';
import { StateValue, Edge, PathMap, PathItem, PathsItem, PathsMap, AdjacencyMap, DefaultContext, ValueAdjacencyMap, EventObject, StateMachine } from './types';
export declare function getNodes(node: StateNode): StateNode[];
export declare function getEventEdges<TContext = DefaultContext, TEvent extends EventObject = EventObject>(node: StateNode<TContext>, event: string): Array<Edge<TContext, TEvent>>;
export declare function getEdges<TContext = DefaultContext, TEvent extends EventObject = EventObject>(node: StateNode<TContext>, options?: {
    depth: null | number;
}): Array<Edge<TContext, TEvent>>;
export declare function getAdjacencyMap<TContext = DefaultContext>(node: StateNode<TContext>, context?: TContext): AdjacencyMap;
export declare function deserializeStateString(valueContextString: string): {
    value: StateValue;
    context: any;
};
export declare function serializeState<TContext>(state: State<TContext>): string;
export declare function serializeEvent<TEvent extends EventObject>(event: TEvent): string;
export declare function deserializeEventString<TEvent extends EventObject>(eventString: string): TEvent;
export interface ValueAdjMapOptions<TContext, TEvent extends EventObject> {
    events: {
        [K in TEvent['type']]: Array<TEvent & {
            type: K;
        }>;
    };
    filter: (state: State<TContext>) => boolean;
    stateSerializer: (state: State<TContext>) => string;
    eventSerializer: (event: TEvent) => string;
}
export declare class ValueAdjacency<TContext, TEvent extends EventObject> {
    machine: StateMachine<TContext, any, TEvent>;
    mapping: ValueAdjacencyMap<TContext, TEvent>;
    options: ValueAdjMapOptions<TContext, TEvent>;
    constructor(machine: StateMachine<TContext, any, TEvent>, options?: Partial<ValueAdjMapOptions<TContext, TEvent>>);
    reaches(stateValue: StateValue, context: TContext): boolean;
}
export declare function getValueAdjacencyMap<TContext = DefaultContext, TEvent extends EventObject = EventObject>(node: StateNode<TContext, any, TEvent>, options?: Partial<ValueAdjMapOptions<TContext, TEvent>>): ValueAdjacencyMap<TContext, TEvent>;
export declare function getShortestValuePaths<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateNode<TContext, any, TEvent>, options: ValueAdjMapOptions<TContext, TEvent>): PathMap;
export declare function getShortestPaths<TContext = DefaultContext>(machine: StateNode<TContext>, context?: TContext): PathMap;
export declare function getShortestPathsAsArray<TContext = DefaultContext>(machine: StateNode<TContext>, context?: TContext): PathItem[];
export declare function getSimplePaths<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateNode<TContext>, options?: ValueAdjMapOptions<TContext, TEvent>): PathsMap;
export declare function getSimplePathsAsArray<TContext = DefaultContext, TEvent extends EventObject = EventObject>(machine: StateNode<TContext>, options?: ValueAdjMapOptions<TContext, TEvent>): PathsItem[];
