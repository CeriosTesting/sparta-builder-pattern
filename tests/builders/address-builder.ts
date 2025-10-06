import { faker } from "@faker-js/faker";
import { Address } from "tests/models/address";

export class AddressBuilder {
	private readonly address: Address = {} as Address;

	private constructor() {}

	static create(): AddressBuilder {
		return new AddressBuilder();
	}

	static createWithDefaults(): AddressBuilder {
		return AddressBuilder.create()
			.countryCode(faker.location.countryCode("alpha-2"))
			.street(faker.location.street())
			.houseNumber(faker.number.int({ min: 1, max: 1000 }))
			.city(faker.location.city())
			.postalCode(faker.location.zipCode("#### ??"));
	}

	street(street: string): AddressBuilder {
		this.address.street = street;
		return this;
	}

	houseNumber(houseNumber: number): AddressBuilder {
		this.address.houseNumber = houseNumber;
		return this;
	}

	city(city: string): AddressBuilder {
		this.address.city = city;
		return this;
	}

	postalCode(postalCode: string): AddressBuilder {
		this.address.postalCode = postalCode;
		return this;
	}

	countryCode(countryCode: string): AddressBuilder {
		this.address.countryCode = countryCode;
		return this;
	}

	build(): Address {
		return this.address;
	}
}
