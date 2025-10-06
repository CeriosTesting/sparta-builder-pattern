import { faker } from "@faker-js/faker";
import { ContactType } from "tests/enums/contact-type";
import { Contact } from "tests/models/contact";

export class ContactBuilder {
	private readonly contact: Contact = {} as Contact;

	private constructor() {}

	static create(): ContactBuilder {
		return new ContactBuilder();
	}

	static createWithDefaults(): ContactBuilder {
		const contactType = faker.helpers.enumValue(ContactType);
		const contactValue =
			contactType === ContactType.Email ? faker.internet.email() : faker.phone.number({ style: "international" });

		return ContactBuilder.create().type(contactType).value(contactValue).isVerified(faker.datatype.boolean());
	}

	type(type: ContactType): ContactBuilder {
		this.contact.type = type;
		return this;
	}

	value(value: string): ContactBuilder {
		this.contact.value = value;
		return this;
	}

	isVerified(isVerified: boolean): ContactBuilder {
		this.contact.isVerified = isVerified;
		return this;
	}

	build(): Contact {
		return this.contact;
	}
}
