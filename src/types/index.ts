export type Index = number;

export type PrimitiveDataType =
	"bool" |
	"i8" |
	"u8" |
	"i16" |
	"u16" |
	"i32" |
	"u32" |
	"f32" |
	"f64" |
	"bigi64" |
	"bigu64";

export interface Allocator<T> {
	getData(index: Index): T | null;
	setData(index: Index, item: T): void;
	ensureCapacity(index: Index): void;
}

export type SupportedPrimitives = number | boolean | bigint;
export type SupportedNonPrimitives = object;

export type ArrayListConfig = {
	dataType?: PrimitiveDataType;
}
