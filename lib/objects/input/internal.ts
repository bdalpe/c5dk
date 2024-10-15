import {
	BreakerProps, HTTPInput,
	HTTPInputProps,
	Input,
	InputProps,
	PersistentQueueProps, QuickConnectProps,
	TCPInputProps
} from "./index";

export type CriblLogsInputProps = InputProps & QuickConnectProps & PersistentQueueProps;

export class CriblLogsInput extends Input<CriblLogsInputProps> {
	get kind() {
		return 'cribl';
	}
}

export type CriblMetricsInputProps = InputProps & QuickConnectProps & PersistentQueueProps & {
	/**
	 * A prefix that is applied to the metrics provided by Cribl Stream.
	 */
	prefix: string;

	/**
	 * Include granular metrics.
	 *
	 * Disabling this will drop the following metrics events:
	 * * `cribl.logstream.host.(in_bytes,in_events,out_bytes,out_events)`,
	 * * `cribl.logstream.index.(in_bytes,in_events,out_bytes,out_events)`,
	 * * `cribl.logstream.source.(in_bytes,in_events,out_bytes,out_events)`,
	 * * `cribl.logstream.sourcetype.(in_bytes,in_events,out_bytes,out_events)`.
	 */
	fullFidelity: boolean;
}

export class CriblMetricsInput extends Input<CriblMetricsInputProps> {
	get kind() {
		return 'criblmetrics';
	}
}

export type CriblHTTPInputProps = HTTPInputProps & {
	/**
	 * Shared secrets to be provided by any client (Authorization: <token>).
	 *
	 * If empty, unauthed access is permitted.
	 */
	authTokens: string[];
}

export class CriblHTTPInput extends HTTPInput<CriblHTTPInputProps> {
	static get defaults(): Partial<HTTPInputProps> {
		return {
			...super.defaults,
			enableProxyHeader: false,
		}
	}

	get kind() {
		return 'cribl_http';
	}
}

export class CriblTCPInput extends Input<Omit<TCPInputProps, 'ipWhitelistRegex'>> {
	get kind() {
		return 'cribl_tcp';
	}
}

export type AppScopeInputProps = TCPInputProps & BreakerProps;

export class AppScopeInput extends Input<AppScopeInputProps> {
	get kind() {
		return 'appscope';
	}
}

export type DatagenInputProps = InputProps & PersistentQueueProps & {
	/**
	 * List of datagens
	 */
	samples: {
		/**
		 * Name of the datagen file
		 */
		sample: string;

		/**
		 *  Maximum no. of events to generate per second per worker node. Defaults to 10.
		 */
		eventsPerSec: number;
	}[];
}

export class DatagenInput extends Input<DatagenInputProps> {
	get kind() {
		return 'datagen';
	}
}

export type SystemMetricsInputProps = InputProps;

export class SystemMetricsInput extends Input<SystemMetricsInputProps> {
	get kind() {
		return 'systemmetrics';
	}
}

export type SystemStateInputProps = InputProps;

export class SystemStateInput extends Input<SystemStateInputProps> {
	get kind() {
		return 'systemstate';
	}
}

export type ExecInputProps = InputProps;

export class ExecInput extends Input<ExecInputProps> {
	get kind() {
		return 'exec';
	}
}

export type FileMonitorInputProps = InputProps;

export class FileMonitorInput extends Input<FileMonitorInputProps> {
	get kind() {
		return 'filemonitor';
	}
}

export type JournalFilesInputProps = InputProps & {
	path: string;
	interval: number;
	journals: string[];
	rules: {
		filter: string;
		descriptions: string;
	}[];
	currentBoot: boolean;
	maxAgeDur: string;
};

export class JournalFilesInput extends Input<JournalFilesInputProps> {
	get kind() {
		return 'journal_files';
	}
}

// Note: Only the parent Input class is registered in the registry
