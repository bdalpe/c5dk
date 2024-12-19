/*
 * data/packs/<pack_id>/samples/<id>.json
 * data/packs/<pack_id>/lookups/<id>.[yml|csv]
 * default/<pack_id>/...
 * package.json
 */


/*
 * package.json structure:
	{
	  "dependencies": {
	    "HelloPacks": "file:/opt/cribl/default/HelloPacks",
	    "cribl": "file:/opt/cribl/default/cribl",
	    "edge": "file:/opt/cribl/default/edge",
	    "ui": "file:/opt/cribl/default/ui",
	    "cribl-palo-alto-networks": "file:/opt/cribl/state/packs/cribl-palo-alto-networks-d6bc6883-1.1.5.QVI3TZw.crbl"
	  },
	  "name": "LogStream",
	  "version": "4.9.2-f4fd0d71"
	}
*/

import {ConfigConstruct} from "../../config";
import {Construct} from "constructs";
import {File, MergeFile} from "../../private/fs";
import Registry from "../../registry";
import {PackFetcher} from "./fetchers";
import {FilePackFetcher} from "./fetchers/file";
import {URLPackFetcher} from "./fetchers/url";
import {DispensaryPatchFetcher} from "./fetchers/dispensary";
import {GitPackFetcher} from "./fetchers/git";
import {basename} from "node:path"

export class Pack extends ConfigConstruct {
	protected fetcher: PackFetcher;

	constructor(scope: Construct, id: string, protected path1: string, props?: any) {
		super(scope, id, props);

		// Pick the type of fetcher based on the URL
		switch (this.path1) {
			case this.path1.match('^https?://')?.input:
				this.fetcher = new URLPackFetcher();
				break;
			case this.path1.match('^file://')?.input || this.path1.match('^/')?.input:
				this.fetcher = new FilePackFetcher();
				break;
			case this.path1.match('^git+')?.input:
				this.fetcher = new GitPackFetcher();
				break;
			default:
				this.fetcher = new DispensaryPatchFetcher();
		}
	}

	get kind() {
		return '';
	}

	 static dump(config: ConfigConstruct[]): undefined {
	 	return undefined;
	}

	synth() {
		// Extract the pack into memfs
		this.fetcher.fetch(this.path1).then((vol) => {

			const data = vol.toJSON('/data', {}, true);
			for (const [filePath, content] of Object.entries(data) as [string, string | Buffer][]) {
				new File(this.path('data', 'packs', this.node.id, filePath)).write(content);
			}

			const dflt = vol.toJSON('/default', {}, true);
			for (const [filePath, content] of Object.entries(dflt) as [string, string | Buffer][]) {
				new File(this.path('default', this.node.id, filePath)).write(content);
			}

			new File(this.path('default', this.node.id, 'README.md')).write(vol.readFileSync('/README.md'));
			new File(this.path('default', this.node.id, 'package.json')).write(vol.readFileSync('/package.json'));

			const dependency = {
				'dependencies': {
					[this.node.id]: `file:${this.path('state', 'packs', basename(this.path1))}`
				}
			}

			new MergeFile(this.path('package.json')).write(JSON.stringify(dependency))
		})
			.catch((err) => {
				console.error(err);
			})
	}
}

Registry.register('packs', Pack);
