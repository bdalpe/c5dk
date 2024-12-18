import {PackFetcher} from "./index";
import {Volume} from "memfs";
import git from 'isomorphic-git';
import tmp from 'tmp';
import http from 'isomorphic-git/http/node'

tmp.setGracefulCleanup();

export class GitPackFetcher extends PackFetcher {
	async fetch(url: string): Promise<InstanceType<typeof Volume>> {
		const vol = new Volume();

		return new Promise(async (resolve, reject) => {
			await git.clone({fs: vol, dir: '/', url: url.substring(4), http})

			resolve(vol);
		})
	}
}
