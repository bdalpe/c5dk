import {Input} from "./index";

export class SplunkSearchInput extends Input {
	get kind() {
		return 'splunk_search';
	}
}

export class AmazonMSKInput extends Input {
	get kind() {
		return 'amazon_msk';
	}
}

export class AmazonKinesisInput extends Input {
	get kind() {
		return 'amazon_kinesis';
	}
}

export class AmazonSQSInput extends Input {
	get kind() {
		return 'amazon_sqs';
	}
}

export class AmazonS3Input extends Input {
	get kind() {
		return 'amazon_s3';
	}
}

export class AzureEventHubInput extends Input {
	get kind() {
		return 'azure_event_hub';
	}
}

export class AzureBlobStorageInput extends Input {
	get kind() {
		return 'azure_blob_storage';
	}
}

export class GoogleCloudPubSubInput extends Input {
	get kind() {
		return 'google_cloud_pub_sub';
	}
}

export class Office365Input extends Input {
	get kind() {
		return 'office365';
	}
}

export class Office365ActivityInput extends Input {
	get kind() {
		return 'office365_activity';
	}
}

export class Office365MessageTraceInput extends Input {
	get kind() {
		return 'office365_message_trace';
	}
}

export class PrometheusScraperInput extends Input {
	get kind() {
		return 'prometheus_scraper';
	}
}

export class KafkaInput extends Input {
	get kind() {
		return 'kafka';
	}
}

export class ConfluentCloudInput extends Input {
	get kind() {
		return 'confluent_cloud';
	}
}

export class CrowdStrikeFDRInput extends Input {
	get kind() {
		return 'crowdstrike_fdr';
	}
}

export class WizInput extends Input {
	get kind() {
		return 'wiz';
	}
}
