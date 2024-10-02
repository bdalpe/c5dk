import {ConfigConstruct} from "../config";
import {Construct} from "constructs";
import {File} from "../private/fs";
import Registry from "../registry";

interface PipelineProps {

}

export class Pipeline extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: PipelineProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'pipelines';
	}

	synth(): void {
		const config = this.toYaml(this.config);

		new File(this.path('local', 'cribl', 'pipelines', this.node.id, 'conf.yml')).write(config);
	}

	static dump(config: ConfigConstruct[]): undefined {
		return undefined;
	}
}

Registry.register('pipelines', Pipeline);
