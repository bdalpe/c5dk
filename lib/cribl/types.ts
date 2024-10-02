export type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T;
export type AbstractConstructor<T, Arguments extends unknown[] = any[]> = abstract new(...arguments_: Arguments) => T;

export type VariableType = 'expression' | 'number' | 'object' | 'array';

export interface VariableArguments {
	type: VariableType;
	name: string;
}

