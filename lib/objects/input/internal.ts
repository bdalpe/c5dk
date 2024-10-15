import {Input} from "./index";

export class CriblLogsInput extends Input {
	get kind() {
		return 'cribl';
	}
}

export class CriblMetricsInput extends Input {
	get kind() {
		return 'criblmetrics';
	}
}

export class CriblHTTPInput extends Input {
	get kind() {
		return 'cribl_http';
	}
}

export class CriblTCPInput extends Input {
	get kind() {
		return 'cribl_tcp';
	}
}

export class AppScopeInput extends Input {
	get kind() {
		return 'appscope';
	}
}

export class DatagenInput extends Input {
	get kind() {
		return 'datagen';
	}
}

export class SystemMetricsInput extends Input {
	get kind() {
		return 'systemmetrics';
	}
}

export class SystemStateInput extends Input {
	get kind() {
		return 'systemstate';
	}
}

export class ExecInput extends Input {
	get kind() {
		return 'exec';
	}
}

export class FileMonitorInput extends Input {
	get kind() {
		return 'filemonitor';
	}
}

export class JournalFilesInput extends Input {
	get kind() {
		return 'journalfiles';
	}
}

// Note: Only the parent Input class is registered in the registry
