const Api = require('../../services/api');

class RelicBuildSimulator {

	constructor() {}

	static async simulate(set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization) {

		const relicBuild = [set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization];
		const relic_config = (await Api.getRelicsConfig()).data.attributes;
		const optimization = relicBuild.pop();
		const sets = relicBuild.slice(0, 2);
		const stats = relicBuild.slice(2, 8);

		let esperBuild = {
			set_4_name: set1,
			set_4_bonus: 0,
			set_2_name: set2,
			set_2_bonus: 0,
			main_stat_1: mainStat1,
			main_stat_1_value: 0,
			main_stat_2: mainStat2,
			main_stat_2_value: 0,
			main_stat_3: mainStat3,
			main_stat_3_value: 0,
			sub_stat_1: subStat1,
			sub_stat_1_value: 0,
			sub_stat_2: subStat2,
			sub_stat_2_value: 0,
			sub_stat_3: subStat3,
			sub_stat_3_value: 0,
			sub_stat_4: subStat4,
			sub_stat_4_value: 0,
			flat_hp: 0,
			flat_atk: 0,
			flat_def: 0,
			errors: [],
		};

		// check if sets are valid
		esperBuild = argCheckSets(sets, esperBuild, relic_config);

		// check if stats are valid
		esperBuild = argCheckStats(stats, esperBuild, relic_config);

		if (relicBuild.errors.length > 0) {
			return esperBuild;
		}

		// translate optimization
		const max_upgrade_by_substat = relic_config.relics_rules.max_upgrade_by_substat * relic_config.relics_rules.total_relics_per_esper;
		
		let levels = [0, 0, 0, 0];

		switch (optimization) {
			case "perfect":
				levels = [max_upgrade_by_substat-5, 5, 0, 0];
				break;
			case "good":
				levels = [max_upgrade_by_substat-10, 8, 2, 0];
				break;
			case "average":
				levels = [max_upgrade_by_substat-15, 10, 5, 0];
				break;
			case "bad":
				levels = [max_upgrade_by_substat-20, 10, 5, 5];
				break;
			case "worst":
				levels = [max_upgrade_by_substat-25, 5, 10, 10];
			default:
				break;
		}

		// calculate stats
		esperBuild = calculateStats(levels, sets, stats, esperBuild, relic_config);

		// calculate flat stats
		esperBuild = calculateFlatStats(esperBuild, relic_config);
	}

	argCheckSets(sets, esperBuild, relic_config) {
		sets.forEach(set => {
			if (relic_config.sets.some(set => set.set_name === set)) {
				esperBuild.errors.push('Invalid set: ' + set);
			}
		})

		return esperBuild;
	}

	argCheckStats(stats, esperBuild, relic_config) {
		stats.forEach(stat => {
			if (relic_config.stats.some(stat => stat.stat_name === stat)) {
				esperBuild.errors.push('Invalid stat: ' + stat);
			}
		})

		return esperBuild;
	}

	calculateStats(levels, sets, stats, esperBuild, relic_config) {
		// calculate set bonuses
		esperBuild = calculateSetBonuses(sets, esperBuild, relic_config);

		// calculate main stats
		esperBuild = calculateMainStats(stats, esperBuild, relic_config);

		// calculate sub stats
		esperBuild = calculateSubStats(levels, stats, esperBuild, relic_config);

		return esperBuild;
	}

	calculateSetBonuses(sets, esperBuild, relic_config) {
		sets.forEach(set => {
			const setConfig = relic_config.sets.find(set_conf => set_conf.set_name === set);
			if (setConfig.set_type === 4) {
				esperBuild.set_4_bonus = setConfig.set_bonus;
			} else if (setConfig.set_type === 2) {
				esperBuild.set_2_bonus = setConfig.set_bonus;
				
			}
		});

		return esperBuild;
	}

	calculateMainStats(stats, esperBuild, relic_config) {
		esperBuild.main_stat_1 = stats[0];
		let temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[0]).main_stat_conf;
		esperBuild.main_stat_1_value = temp_conf.base + temp_conf.growth * relic_config.relics_rules.max_main_stat_upgrades;

		esperBuild.main_stat_2 = stats[1];
		temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[1]).main_stat_conf;
		esperBuild.main_stat_2_value = temp_conf.base + temp_conf.growth * relic_config.relics_rules.max_main_stat_upgrades;

		esperBuild.main_stat_3 = stats[2];
		temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[2]).main_stat_conf;
		esperBuild.main_stat_3_value = temp_conf.base + temp_conf.growth * relic_config.relics_rules.max_main_stat_upgrades;

		return esperBuild;
	}

	calculateSubStats(levels, stats, esperBuild, relic_config) {
		
		// check for optimal substats distribution
		if (stats.includes("C.RATE") || stats.includes("ACC") || stats.includes("RESIST") ) {
			if (stats.includes("C.RATE")) {
				const index = stats.indexOf("C.RATE")-2;
				const max_stat_dot = relic_config.relics_rules.max_effective_c_rate / relic_config.relics_rules.stats.filter(stat => stat.stat_name === "C.RATE")[0].sub_stat_conf.growth;
				const diff = max_stat_dot - levels[index];
				diff >= 0 ? levels[index] = max_stat_dot : levels[index] = levels[index];
				levels[index+1] = levels[index+1] + diff;
			} else if (stats.includes("ACC")) {
				const index = stats.indexOf("ACC")-2;
				const max_stat_dot = relic_config.relics_rules.max_effective_acc / relic_config.relics_rules.stats.filter(stat => stat.stat_name === "ACC")[0].sub_stat_conf.growth;
				const diff = max_stat_dot - levels[index];
				diff >= 0 ? levels[index] = max_stat_dot : levels[index] = levels[index];
				levels[index+1] = levels[index+1] + diff;
			} else if (stats.includes("RESIST")) {
				const index = stats.indexOf("RESIST")-2;
				const max_stat_dot = relic_config.relics_rules.max_effective_resist / relic_config.relics_rules.stats.filter(stat => stat.stat_name === "RESIST")[0].sub_stat_conf.growth;
				const diff = max_stat_dot - levels[index];
				diff >= 0 ? levels[index] = max_stat_dot : levels[index] = levels[index];
				levels[index+1] = levels[index+1] + diff;
			}
		}
		
		esperBuild.sub_stat_1 = stats[3];
		let temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[3]).sub_stat_conf;
		esperBuild.sub_stat_1_value = temp_conf.base + temp_conf.growth * levels[0];

		esperBuild.sub_stat_2 = stats[4];
		temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[4]).sub_stat_conf;
		esperBuild.sub_stat_2_value = temp_conf.base + temp_conf.growth * levels[1];

		esperBuild.sub_stat_3 = stats[5];
		temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[5]).sub_stat_conf;
		esperBuild.sub_stat_3_value = temp_conf.base + temp_conf.growth * levels[2];

		esperBuild.sub_stat_4 = stats[6];
		temp_conf = relic_config.stats.find(stat => stat.stat_name === stats[6]).sub_stat_conf;
		esperBuild.sub_stat_4_value = temp_conf.base + temp_conf.growth * levels[3];

		return esperBuild;
	}

	calculateFlatStats(esperBuild, relic_config) {
		esperBuild.flat_hp = relic_config
	}

}