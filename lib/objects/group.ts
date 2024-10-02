import {ContainerConstruct} from "../container";

export interface GroupProps {}

export class WorkerGroup extends ContainerConstruct {
	get kind() {
		return 'group';
	}
}
