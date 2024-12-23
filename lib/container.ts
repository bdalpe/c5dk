import Registry from "./registry";
import {File} from "./private/fs";
import {ConfigConstruct} from "./config";

export abstract class ContainerConstruct extends ConfigConstruct {
	package = 'cribl';
	abstract kind: string;

	synth() {
		const types = Registry.registry;
		const containers = Registry.containerRegistry;

		const configs = this.node.children.filter(child => child instanceof ConfigConstruct);

		for (const [type, clazz] of Object.entries(types)) {
			const c = configs.filter(child => child instanceof types[type as keyof typeof types]);

			if (!c || c.length === 0) continue;

			for (const config of c) {
				/*
				 * This is mostly no-op, but there are some resources that write
				 * files like samples, certificates, and pipelines
				 */
				config.synth();
			}

			// Handle scenario where the default config file isn't used (see pipelines)
			const output = clazz.dump(c);

			if (output) {
				new File(this.path('local', clazz.package ?? this.package, `${type}.yml`)).write(this.toYaml(output));
			}
		}

		const contexts = this.node.children.filter(child => child instanceof ContainerConstruct);

		for (const context of contexts) {
			context.synth();
		}

		for (const [type, clazz] of Object.entries(containers)) {
			const c = contexts.filter(child => child instanceof containers[type as keyof typeof containers]);

			if (!c || c.length === 0) continue;

			const output = clazz.dump(c);

			if (output) {
				new File(this.path('local', this.package, `${type}.yml`)).write(this.toYaml(output));
			}
		}
	}

	static plural(noun: string) {
		return `${noun.endsWith('s') ? noun : noun + 's'}`;
	}
}
