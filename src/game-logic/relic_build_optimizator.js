class RelicBuildOptimizator {
	
	constructor() {}

	// relic build optimization methods

	static detectOptimizationNeeds(relicBuild, subStat1, subStat2, subStat3, subStat4, relic_config) {
		
		const subStats = [subStat1, subStat2, subStat3, subStat4];

		let totalCrate = 0;
		let totalAcc = 0;
		let totalRes = 0;
		if (subStats.some("C.RATE", "ACC", "RES")) {

			relicBuild.forEach(relic => {
				relic.forEach(subStat => {
					if (subStat.stat === "C.RATE") {
						totalCrate += relic.subStat.value;
					}
					if (subStat.stat === "ACC") {
						totalAcc += relic.subStat.value;
					}
					if (subStat.stat === "RES") {
						totalRes += relic.subStat.value;
					}
				});
			});
		}

		if (totalCrate || totalAcc || totalRes > 100) {
			this.optimizeBuild(relicBuild, subStat1, subStat2, subStat3, subStat4, totalCrate, totalAcc, totalRes, relic_config);
	
		} else {
			return relicBuild;
		}
	}

	static optimizeBuild(relicBuild, subStat1, subStat2, subStat3, subStat4, totalCrate, totalAcc, totalRes, relic_config) {
		
		if (totalCrate > 100) {
			const diff = totalCrate - 100;
			const dots = diff / relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === "C.RATE")[0].growth;
			for (let i = 0; i < dots; i++) {
				relicBuild.forEach(relic => {
					relic.forEach(subStat => {
						if (subStat.stat === "C.RATE") {
							subStat.value -= relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === "C.RATE")[0].growth;
						}
					});
				});
			}
		}		
	}
}


module.exports = RelicBuildOptimizator;