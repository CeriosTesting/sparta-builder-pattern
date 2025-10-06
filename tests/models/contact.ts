import { ContactType } from "tests/enums/contact-type";

export type Contact = {
	type: ContactType;
	value: string;
	isVerified: boolean;
};
