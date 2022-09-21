const RelicBuildGenerator = require('./relic-build-generator');

class Calculator {

	constructor() {}

	static async simulate(esper, set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization) {
		const generator = new RelicBuildGenerator();
		const relicBuild = generator.generateRelicSet(set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization); 

		if (relicBuild.errors.length > 0) {
			return relicBuild;
		}

		
	}
}