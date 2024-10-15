import {Input} from "./index";

export class TCPJSONInput extends Input {
	get kind() {
		return 'tcpjson';
	}
}

export class SplunkHECInput extends Input {
	get kind() {
		return 'splunk_hec';
	}
}

export class FirehoseInput extends Input {
	get kind() {
		return 'firehose';
	}
}

export class PrometheusRemoteWriteInput extends Input {
	get kind() {
		return 'prometheus_remote_write';
	}
}

export class GrafanaInput extends Input {
	get kind() {
		return 'grafana';
	}
}

export class LokiInput extends Input {
	get kind() {
		return 'loki';
	}
}

export class HTTPInput extends Input {
	get kind() {
		return 'http';
	}
}

export class RawHTTPIOInput extends Input {
	get kind() {
		return 'raw_http';
	}
}

export class ElasticSearchInput extends Input {
	get kind() {
		return 'elasticsearch';
	}
}

export class MetricsInput extends Input {
	get kind() {
		return 'metrics';
	}
}

export class SNMPTrapInput extends Input {
	get kind() {
		return 'snmptrap';
	}
}

export class TCPInput extends Input {
	get kind() {
		return 'tcp';
	}
}

export class RawUDPInput extends Input {
	get kind() {
		return 'raw_udp';
	}
}

export class NetFlowInput extends Input {
	get kind() {
		return 'netflow';
	}
}

export class OpenTelemetryInput extends Input {
	get kind() {
		return 'opentelemetry';
	}
}

export class ModelDrivenTelemetryInput extends Input {
	get kind() {
		return 'mdt';
	}
}

export class DatadogAgentInput extends Input {
	get kind() {
		return 'datadog';
	}
}

export class WindowsEventForwarderInput extends Input {
	get kind() {
		return 'wef';
	}
}
