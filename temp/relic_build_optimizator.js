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
					if (subStat.stat === "RESIST") {
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
		const sub_stat_conf_crate = relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === "C.RATE")[0];
		const sub_stat_conf_acc = relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === "ACC")[0];
		const sub_stat_conf_res = relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === "RESIST")[0];

		const subStats = [subStat1, subStat2, subStat3, subStat4];
		const total = [{subName: "C.RATE", total: totalCrate}, {subName: "ACC", total: totalAcc}, {subName: "RESIST", total: totalRes}];
		const optiNeeds = []

		total.forEach(subStat => {
			if (subStat.total > 100) {
				const subStatConf = relic_config.sub_stats_conf.filter(sub_stat => sub_stat.stat === subStat.subName)[0];
				let diff = subStat.total - 100;
				let dots = diff / subStatConf.growth;

				optiNeeds.push({subName: subStat.subName, dots: dots});
			}
		});

		



		if (totalCrate > 100) {
			const diff = totalCrate - 100;
			const dots = diff / sub_stat_conf_crate.growth;

			for (let i = 0; i < dots; i++) {
				relicBuild.forEach(relic => {
					relic.forEach(subStat => {
						if (subStat.stat === "C.RATE" && subStat.value > sub_stat_conf_crate.base) {
							subStat.value -= sub_stat_conf_crate.growth;
							if (subStat1 === "ACC" && totalAcc < 100) {
								relic.subStat1.value += sub_stat_conf_acc.growth;
								totalAcc += sub_stat_conf_acc.growth;
							}
						}
					});
				});
			}
		}		
	}
}


module.exports = RelicBuildOptimizator;