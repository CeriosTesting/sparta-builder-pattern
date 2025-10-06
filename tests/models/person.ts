import { Gender } from "tests/enums/gender";
import { Address } from "tests/models/address";
import { Contact } from "tests/models/contact";

export type Person = {
	uuid: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	dateOfBirth: Date;
	isActive: boolean;
	address: Address;
	contacts?: Contact[];
	hobbies?: string[];
	notes?: string;
};
