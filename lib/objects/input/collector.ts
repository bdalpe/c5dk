import {Input} from "./index";

export class AzureBlobCollectorInput extends Input {
	get kind() {
		return 'azure_blob_collector'
	}
}

export class CriblLakeCollectorInput extends Input {
	get kind() {
		return 'cribl_lake_collector'
	}
}

export class DatabaseCollectorInput extends Input {
	get kind() {
		return 'database_collector'
	}
}

export class GoogleCloudStorageCollectorInput extends Input {
	get kind() {
		return 'google_cloud_storage_collector'
	}
}

export class HealthCheckCollectorInput extends Input {
	get kind() {
		return 'health_check_collector'
	}
}

export class RESTCollectorInput extends Input {
	get kind() {
		return 'rest_collector'
	}
}

export class S3CollectorInput extends Input {
	get kind() {
		return 's3_collector'
	}
}

export class SplunkSearchCollectorInput extends Input {
	get kind() {
		return 'splunk_search_collector'
	}
}
