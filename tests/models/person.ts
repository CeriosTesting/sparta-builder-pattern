import { Gender } from "tests/enums/gender";
import { Address } from "tests/models/address";

export type Person = {
	uuid: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	dateOfBirth: Date;
	isActive: boolean;
	address: Address;
	hobbies?: string[];
	notes?: string;
};
