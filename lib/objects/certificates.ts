import {ConfigConstruct} from "../config";
import {pick} from "es-toolkit";
import {Construct} from "constructs";
import {File} from "../private/fs";
import Registry from "../registry";

export interface CertificateProps {
	/**
	 * Brief description of the certificate.
	 *
	 * Optional.
	 */
	description?: string;

	certificate: string;

	privateKey: string;

	passphrase?: string;

	caCert?: string;
}

export class Certificate extends ConfigConstruct {
	protected certificate: string;
	protected privateKey: string;
	protected passphrase : string | undefined;
	protected caCert: string | undefined;

	constructor(scope: Construct, id: string, props: CertificateProps) {
		super(scope, id, pick(props, ['description']));

		this.certificate = props.certificate;
		this.privateKey = props.privateKey;
		this.passphrase = props.passphrase;
		this.caCert = props.caCert;
	}

	get kind() {
		return 'certificates';
	}

	synth(): void {
		new File(this.path('local', 'cribl', 'auth', 'certs', `${this.node.id}.pem`)).write(this.certificate);
		new File(this.path('local', 'cribl', 'auth', 'certs', `${this.node.id}.key`)).write(this.privateKey);
		if (this.passphrase) new File(this.path('local', 'cribl', 'auth', 'certs', `${this.node.id}.pas`)).write(this.passphrase);
		if (this.caCert) new File(this.path('local', 'cribl', 'auth', 'certs', `${this.node.id}.crt`)).write(this.caCert);
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('certificates', Certificate);
