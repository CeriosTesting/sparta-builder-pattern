import { writeFileSync } from "node:fs";
import test from "@playwright/test";
import { PersonsDirector } from "directors/persons-director";

test("create random persons", async () => {
	const persons = PersonsDirector.createRandomPersons({
		numberOfPersons: 10,
		age: { minYears: 18, maxYears: 65 },
		contacts: { min: 1, max: 3 },
	});

	console.log(JSON.stringify(persons, null, 2));
});

test("createPerformanceTestData - export all scenarios", async () => {
	const scenarios = ["light", "medium", "heavy", "extreme"];

	for (const scenario of scenarios) {
		const population = PersonsDirector.createPerformanceTestData(scenario as "light" | "medium" | "heavy" | "extreme");

		// Export individual scenario data to JSON file
		const filename = `performance-data-${scenario}.json`;

		writeFileSync(filename, JSON.stringify(population, null, 2));
	}
});
