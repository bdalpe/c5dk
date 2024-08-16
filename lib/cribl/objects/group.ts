import {Construct} from "constructs";
import {BaseConstruct} from "../base";

export interface GroupProps {}

export class Group extends BaseConstruct {
	constructor(scope: Construct, id: string, props: GroupProps) {
		super(scope, id, props);
	}
}
