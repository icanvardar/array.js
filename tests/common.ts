export type TestType = {
	field1: number,
	field2: string,
	field3: {
		field31: number,
		field32: boolean,
	}
}

export interface TestInterface {
	field1: number,
	field2: string,
	field3: {
		field31: number,
		field32: boolean,
	}
}

export const testType: TestType = {
	field1: 1,
	field2: "test",
	field3: {
		field31: 1,
		field32: true,
	},
};

export const testInterface: TestInterface = {
	field1: 1,
	field2: "test",
	field3: {
		field31: 1,
		field32: true,
	},
};
