export type VariableType = 'expression' | 'number' | 'object' | 'array';

export interface VariableArguments {
	type: VariableType;
	name: string;
}

