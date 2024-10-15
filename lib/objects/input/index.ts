import Registry from "../../registry";
import {ConfigConstruct, ConstructProps} from "../../config";
import {Construct} from "constructs";
import {SecureVersion} from "node:tls";

interface MetadataField {
	/**
	 * Field name
	 */
	name: string;

	/**
	 * JavaScript expression to compute field's value, enclosed in quotes or backticks. (Can evaluate to a constant.)
	 */
	value: string;
}

export type InputProps = {
	/**
	 * Enable/disable this input
	 */
	disabled: boolean;

	/**
	 * Select whether to send data to Routes, or directly to Destinations.
	 */
	sendToRoutes: boolean;

	/**
	 * Pipeline to process data from this Source before sending it through the Routes.
	 */
	pipeline?: string;

	/**
	 * Fields to add to events from this input.
	 */
	metadata?: MetadataField[];

	/**
	 * Optionally, enable this config only on a specified Git branch. If empty, will be enabled everywhere.
	 */
	environment?: string;

	/**
	 * Add tags for filtering and grouping in Stream.
	 */
	streamtags?: []
}

export type NetworkInputProps = InputProps & PersistentQueueProps & {
	/**
	 * Address to bind on.
	 *
	 * Defaults to 0.0.0.0 (all addresses).
	 *
	 * @optional
	 */
	host?: string;

	/**
	 * Port to listen to.
	 */
	port: number;

	tls?: TLSProps;

	/**
	 * Regex matching IP addresses that are allowed to send data
	 */
	ipWhitelistRegex?: string;

	/**
	 * Enable if the connection is proxied by a device that supports Proxy Protocol V1 or V2.
	 */
	enableProxyHeader: boolean;
}

export type BaseTCPInputProps = NetworkInputProps & {
	/**
	 * Enable if the connection is proxied by a device that supports Proxy Protocol V1 or V2.
	 */
	enableProxyHeader: boolean;
}

export type TCPInputProps = BaseTCPInputProps & {
	/**
	 * Maximum number of active connections allowed per Worker Process, use 0 for unlimited.
	 */
	maxActiveCxn: number;
}

export type HTTPInputProps = BaseTCPInputProps & {
	/**
	 * Maximum number of active requests per Worker Process. Use 0 for unlimited.
	 */
	maxActiveReq: number;

	/**
	 * Toggle this to `true` to add request headers to events, in the `__headers` field.
	 */
	captureHeaders: boolean;

	/**
	 * How often request activity is logged at the `info` level. A value of 1 would log every request, 10 every 10th request, etc.
	 */
	activityLogSampleRate: number;

	/**
	 * How long to wait for an incoming request to complete before aborting it. Use 0 to disable.
	 */
	requestTimeout: number;
}

export interface BreakerProps {
	/**
	 * A list of event breaking rulesets that will be applied, in order, to the input data stream.
	 */
	breakerRulesets: string[];

	/**
	 * The amount of time (in milliseconds) the Event Breaker will wait for new data to be sent to a specific channel, before flushing the data stream out, as-is, to the Pipelines.
	 */
	staleChannelFlushMs: number;
}

export interface PersistentQueueEnabledInputProps {
	pqEnabled: true;
	pq: PersistentQueueSettings;
}

export interface PersistentQueueDisabledInputProps {
	pqEnabled: false;
	pq?: PersistentQueueSettings;
}

export type PersistentQueueProps = PersistentQueueDisabledInputProps | PersistentQueueEnabledInputProps;

export interface QuickConnectSettings {
	sendToRoutes: true;
	connections?: QuickConnectConnection[];
}

export interface DataRouteSettings {
	sendToRoutes: false;
	connections: QuickConnectConnection[];
}

export type QuickConnectProps = QuickConnectSettings | DataRouteSettings;

export interface PersistentQueueSettings {
	/**
	 * With Smart mode, PQ will write events to the filesystem only when it detects backpressure from the processing engine.
	 *
	 * With Always On mode, PQ will always write events directly to the queue before forwarding them to the processing engine.
	 */
	mode: 'smart' | 'always';

	/**
	 * The maximum amount of events to hold in-memory before dumping the events to disk.
	 */
	maxBufferSize: number;

	/**
	 * The number of events to send downstream before committing that Stream has read them.
	 */
	commitFrequency: number;

	/**
	 * The maximum size to store in each queue file before closing and optionally compressing (KB, MB, etc.).
	 */
	maxFileSize: string;

	/**
	 * The maximum amount of disk space the queue is allowed to consume.
	 *
	 * Once reached, the system stops queueing and applies the fallback Queue-full behavior.
	 *
	 * Enter a numeral with units of KB, MB, etc.
	 */
	maxSize: string;

	/**
	 * The location for the persistent queue files.
	 *
	 * To this field's value, the system will append: /<worker-id>/inputs/<input-id>.
	 */
	path: string;

	/**
	 * Codec to use to compress the persisted data.
	 */
	compress: 'none' | 'gzip';
}

export type TLSProps = {disabled: false} & TLSSettings | {disabled: true} & Partial<TLSSettings>;

export interface TLSSettings {
	/**
	 * The name of the predefined certificate.
	 */
	certificateName: string;

	/**
	 * Path on server containing the private key to use. PEM format. Can reference $ENV_VARS.
	 */
	privKeyPath: string;

	/**
	 * Passphrase to use to decrypt private key.
	 */
	passphrase?: string;

	/**
	 * Path on server containing certificates to use. PEM format. Can reference $ENV_VARS.
	 */
	certPath: string;

	/**
	 * Path on server containing CA certificates to use. PEM format. Can reference $ENV_VARS.
	 */
	caPath?: string;

	/**
	 * Whether to require clients to present their certificates. Used to perform client authentication using SSL certs.
	 */
	requestCert?: boolean;

	/**
	 * Minimum TLS version to accept from connections.
	 */
	minVersion?: SecureVersion;

	/**
	 * Maximum TLS version to accept from connections.
	 */
	maxVersion?: SecureVersion;
}

export interface QuickConnectConnection {
	pipeline: string;
	output: string;
}

export abstract class Input<T extends ConstructProps> extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: T) {
		super(scope, id, props);
	}

	static get defaults(): Partial<InputProps> {
		return {
			disabled: false,
			sendToRoutes: true,
			streamtags: [],
		};
	}

	get kind() {
		return 'inputs';
	}

	get config() {
		return {
			type: this.kind,
			...super.config
		}
	}
}

export abstract class PQInput<T extends ConstructProps> extends Input<T> {
	static get defaults(): Partial<InputProps & PersistentQueueInputProps> {
		return {
			...super.defaults,
			pqEnabled: false,
		}
	}
}

export abstract class HTTPInput<T extends HTTPInputProps> extends Input<T> {
	static get defaults(): Partial<HTTPInputProps> {
		return {
			...super.defaults,
			maxActiveReq: 256,
			captureHeaders: false,
			activityLogSampleRate: 1,
			requestTimeout: 0,
			enableProxyHeader: false,
		}
	}
}

// Register Input class in the registry
Registry.register('inputs', Input);
