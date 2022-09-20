const Api = require('../../services/api');
const RelicBuildOptimizator = require('./relic_build_optimizator');


class RelicBuildGenerator {
	
	constructor() {}
	
	// relic set generation methods
	
	static async generateRelicSet(set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization) {
		const relic_config = (await Api.getRelicsConfig()).data.attributes;

		let relic1 = this.createRelic(1, "ATK", subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic2 = this.createRelic(2, mainStat1, subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic3 = this.createRelic(3, "DEF", subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic4 = this.createRelic(4, mainStat2, subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic5 = this.createRelic(5, "HP", subStat1, subStat2, subStat3, subStat4, set2, optimization, relic_config);
		let relic6 = this.createRelic(6, mainStat3, subStat1, subStat2, subStat3, subStat4, set2, optimization, relic_config);

		let relicBuild = [relic1, relic2, relic3, relic4, relic5, relic6];

		// RelicBuildOptimizator.detectOptimizationNeeds(relicBuild, relic_config);
		
		return relicBuild;
		
	}

	createRelic(position, main_stat, sub_stat_1, sub_stat_2, sub_stat_3, sub_stat_4, set, optimization, relic_config) {
		let levels = [0, 0, 0, 0];
		
		switch (optimization) {
			case "perfect":
				levels = [5, 0, 0, 0];
				break;
			case "good":
				levels = [4, 1, 0, 0];
				break;
			case "average":
				levels = [3, 1, 1, 0];
				break;
			case "bad":
				levels = [2, 2, 1, 0];
				break;
			case "terrible":
				levels = [1, 2, 1, 1];
				break;
			default:
				levels = [2, 1, 1, 1];
				break;

		}
		
		const relicMainStat = this.getMainStat(main_stat, position, relic_config);
		const relicSubStat1 = this.getSubStat(sub_stat_1, levels[0], relic_config);
		const relicSubStat2 = this.getSubStat(sub_stat_2, levels[1], relic_config);
		const relicSubStat3 = this.getSubStat(sub_stat_3, levels[2], relic_config);
		const relicSubStat4 = this.getSubStat(sub_stat_4, levels[3], relic_config);
		const relicSet = this.getSet(set, relic_config);

		const relic = {
			main_stat: relicMainStat,
			sub_stat_1: relicSubStat1,
			sub_stat_2: relicSubStat2,
			sub_stat_3: relicSubStat3,
			sub_stat_4: relicSubStat4,
			set: relicSet
		};

		return relic;
	}

	getMainStat(main_stat, position, relic_config) {
		if (relic_config.main_stats[position-1].stats.includes(main_stat)) {
			let base = 0;
			let growth = 0;

			relic_config.main_stats_conf.forEach(stat => {
				if (stat.name === main_stat) {
					base = stat.base;
					growth = stat.growth;
				}
			})
			
			const mainStat = {
				stat: main_stat,
				value: base + growth * relic_config.relics_rules.max_main_stat_upgrades
			}

			return mainStat;
		}
	}

	getSubStat(sub_stat, level, relic_config) {
		if (relic_config.sub_stats.includes(sub_stat)) {
			let base = 0;
			let growth = 0;

			relic_config.sub_stats_conf.forEach(stat => {
				if (stat.name === sub_stat) {
					base = stat.base;
					growth = stat.growth;
				}
			})

			const subStat = {
				stat: sub_stat,
				value: base + growth * level
			}

			return subStat;
		}
	}

	getSet(set, relic_config) {
		if (relic_config.sets.includes(set)) {
			let setDescription = "";
			let setBonus = 0;
			let setType = 0;

			relic_config.sets.forEach(set => {
				if (set.name === set) {
					setDescription = set.set_description;
					setBonus = set.set_bonus;
					setType = set.set_type;
				}
			});
			
			const set = {
				name: set,
				bonus: setBonus,
				description: setDescription,
				type: setType
			}

			return set;
		}
	}
}

module.exports = RelicBuildGenerator;