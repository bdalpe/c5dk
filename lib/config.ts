import {Construct} from "constructs";
import {dump} from "js-yaml";
import {join} from "node:path";
import {Cribl} from "./index";
import {ContainerConstruct} from "./container";

export interface ConstructProps {}

export abstract class ConfigConstruct extends Construct {
	protected _config = {};

	constructor(scope: Construct, id: string, props: ConstructProps) {
		super(scope, id);
		this._config = props;
	}

	abstract kind: string;

	get config(): Record<string, unknown> {
		return this._config;
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> | undefined {
		return {
			[this.prototype.kind]: config.reduce((prev, curr) => ({[curr.node.id]: curr.config, ...prev}), {})
		}
	}

	toYaml(obj: unknown): string {
		return dump(obj);
	}

	path(...paths: string[]) {
		return join(
			(this.node.root as Cribl)['outdir'],
			...this.node.scopes.slice(1).filter(x => x instanceof ContainerConstruct).flatMap(scope => [ContainerConstruct.plural(scope.kind), scope.node.id]),
			...paths
		)
	}

	synth(): void {}
}
