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

	/**
	 * Builds and returns the final Address object.
	 *
	 * This method completes the building process and returns the constructed
	 * Address object with all the values that were set through the builder methods.
	 *
	 * @returns The constructed Address object
	 *
	 * @example
	 * ```typescript
	 * const address = AddressBuilder.create()
	 *   .street("Broadway")
	 *   .houseNumber(1234)
	 *   .city("New York")
	 *   .postalCode("10001")
	 *   .countryCode("US")
	 *   .build(); // Returns the Address object
	 * ```
	 *
	 * @remarks
	 * After calling build(), you have a complete Address object that can be used
	 * in your application. The builder can be reused to create another address
	 * if needed, but typically you create a new builder instance for each address.
	 */
	build(): Address {
		return this.address;
	}
}
