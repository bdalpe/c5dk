import {join} from "node:path";
import {Construct} from "constructs";
import Registry from "./registry";
import {File} from "./private/fs";
import {dump} from "js-yaml";
import {Cribl} from "./index";
import {ConfigConstruct} from "./config";

export abstract class ContainerConstruct extends Construct {
	package = 'cribl';
	abstract kind: string;

	synth() {
		const types = Registry.registry;

		const configs = this.node.children.filter(child => child instanceof ConfigConstruct);

		for (const [type, clazz] of Object.entries(types)) {
			const c = configs.filter(child => child instanceof types[type as keyof typeof types]);

			if (!c || c.length === 0) continue;

			new File(this.path('local', this.package, `${type}.yml`)).write(this.toYaml(clazz.dump(c)));
		}

		const contexts = this.node.children.filter(child => child instanceof ContainerConstruct);

		for (const context of contexts) {
			context.synth();
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

	static plural(noun: string) {
		return `${noun.endsWith('s') ? noun : noun + 's'}`;
	}
}
