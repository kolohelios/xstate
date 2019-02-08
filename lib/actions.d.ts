import { Action, Event, EventObject, SendAction, SendActionOptions, CancelAction, ActionObject, Assigner, AssignAction, ActionFunction, ActionFunctionMap, ActivityActionObject, ActionTypes, ActivityDefinition, RaiseEvent, DoneEvent, ErrorExecutionEvent, DoneEventObject, SendExpr, SendActionObject, OmniEventObject } from './types';
import * as actionTypes from './actionTypes';
export { actionTypes };
export declare const initEvent: {
    type: ActionTypes.Init;
};
export declare function toEventObject<TEvent extends EventObject>(event: Event<TEvent>): TEvent;
export declare function toActionObject<TContext, TEvent extends EventObject>(action: Action<TContext, TEvent>, actionFunctionMap?: ActionFunctionMap<TContext, TEvent>): ActionObject<TContext, TEvent>;
export declare function toActivityDefinition<TContext, TEvent extends EventObject>(action: string | ActivityDefinition<TContext, TEvent>): ActivityDefinition<TContext, TEvent>;
export declare const toActionObjects: <TContext, TEvent extends EventObject>(action: Action<TContext, TEvent>[] | undefined, actionFunctionMap?: Record<string, ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent>> | undefined) => ActionObject<TContext, TEvent>[];
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */
export declare function raise<TContext, TEvent extends EventObject>(event: Event<TEvent>): RaiseEvent<TContext, TEvent>;
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `target` - The target of this event (by default, the machine the event was sent from).
 */
export declare function send<TContext, TEvent extends EventObject>(event: Event<TEvent> | SendExpr<TContext, TEvent>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent>;
export declare function resolveSend<TContext, TEvent extends EventObject>(action: SendAction<TContext, TEvent>, ctx: TContext, event: TEvent): SendActionObject<TContext, OmniEventObject<TEvent>>;
/**
 * Sends an event to this machine's parent machine.
 *
 * @param event The event to send to the parent machine.
 * @param options Options to pass into the send event.
 */
export declare function sendParent<TContext, TEvent extends EventObject>(event: Event<TEvent> | SendExpr<TContext, TEvent>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent>;
/**
 *
 * @param expr The expression function to evaluate which will be logged.
 *  Takes in 2 arguments:
 *  - `ctx` - the current state context
 *  - `event` - the event that caused this action to be executed.
 * @param label The label to give to the logged expression.
 */
export declare function log<TContext, TEvent extends EventObject>(expr?: (ctx: TContext, event: TEvent) => any, label?: string): {
    type: ActionTypes;
    label: string | undefined;
    expr: (ctx: TContext, event: TEvent) => any;
};
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */
export declare const cancel: (sendId: string | number) => CancelAction;
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */
export declare function start<TContext, TEvent extends EventObject>(activity: string | ActivityDefinition<TContext, TEvent>): ActivityActionObject<TContext, TEvent>;
/**
 * Stops an activity.
 *
 * @param activity The activity to stop.
 */
export declare function stop<TContext, TEvent extends EventObject>(activity: string | ActivityDefinition<TContext, TEvent>): ActivityActionObject<TContext, TEvent>;
/**
 * Updates the current context of the machine.
 *
 * @param assignment An object that represents the partial context to update.
 */
export declare const assign: <TContext, TEvent extends EventObject = EventObject>(assignment: Assigner<TContext, TEvent> | Partial<{ [K in keyof TContext]: ((extState: TContext, event: TEvent) => TContext[K]) | TContext[K]; }>) => AssignAction<TContext, TEvent>;
export declare function isActionObject<TContext, TEvent extends EventObject>(action: Action<TContext, TEvent>): action is ActionObject<TContext, TEvent>;
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delay The delay in milliseconds
 * @param id The state node ID where this event is handled
 */
export declare function after(delay: number, id?: string): string;
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */
export declare function done(id: string, data?: any): DoneEventObject;
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */
export declare function doneInvoke(id: string, data?: any): DoneEvent;
export declare function error(data: any, src: string): ErrorExecutionEvent;
