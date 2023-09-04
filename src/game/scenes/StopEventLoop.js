/**
 * Throw this exception to stop other events from happening after this event (for the emitted event only). For example if you want to make sure other sprites don't react
 * throw this event.
 */
export class StopEventLoop extends Error {

}
