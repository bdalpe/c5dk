import {ContainerConstruct} from "../container";

export interface GroupProps {}

export class Fleet extends ContainerConstruct {
	_package = 'edge';

	get kind() {
		return 'group';
	}
}
