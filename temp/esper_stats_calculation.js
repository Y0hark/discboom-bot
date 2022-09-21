const RelicBuildGenerator = require('./relic_build_generator');

class EsperStatsCalculation {

	constructor() {}

	// esper calculation methods

	static buildEsper(esper, set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization) {

		const relic_build = RelicBuildGenerator.generateRelicSet(set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization);
	
		esper.hp = this.calculateEsperHp(esper, relic_build);
		esper.atk = this.calculateEsperAtk(esper, relic_build);
		esper.def = this.calculateEsperDef(esper, relic_build);
		esper.spd = this.calculateEsperSpd(esper, relic_build);
		esper.crit_rate = this.calculateEsperCritRate(esper, relic_build);
		esper.crit_dmg = this.calculateEsperCritDmg(esper, relic_build);
		esper.res = this.calculateEsperRes(esper, relic_build);
		esper.acc = this.calculateEsperAcc(esper, relic_build);

		return esper;
	}

	calculateEsperHp(esper, relics) {
		let hp = esper.hp;
		let hp_flat = 0;
		let hp_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'HP') {
				hp_flat += relic.main_stat.value;
			} else if (relic.main_stat.stat === 'HP Bonus') {
				hp_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Abiding Panacea') {
				hp_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'HP') {
					hp_flat += sub_stat.value;
				} else if (sub_stat.stat === 'HP Bonus') {
					hp_percent += sub_stat.value;
				}
			});
		});

		hp += hp_percent * hp / 100;
		hp += hp_flat;

		return hp;
	}

	calculateEsperAtk(esper, relics) {
		let atk = esper.atk;
		let atk_flat = 0;
		let atk_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'ATK') {
				atk_flat += relic.main_stat.value;
			} else if (relic.main_stat.stat === 'ATK Bonus') {
				atk_percent += relic.main_stat.value;
			} else if (relic.set.name === 'War Machine') {
				atk_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'ATK') {
					atk_flat += sub_stat.value;
				} else if (sub_stat.stat === 'ATK Bonus') {
					atk_percent += sub_stat.value;
				}
			});
		});

		atk += atk_percent * atk / 100;
		atk += atk_flat;

		return atk;
	}

	calculateEsperDef(esper, relics) {
		let def = esper.def;
		let def_flat = 0;
		let def_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'DEF') {
				def_flat += relic.main_stat.value;
			} else if (relic.main_stat.stat === 'DEF Bonus') {
				def_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Stonevein') {
				def_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'DEF') {
					def_flat += sub_stat.value;
				} else if (sub_stat.stat === 'DEF Bonus') {
					def_percent += sub_stat.value;
				}
			});
		});

		def += def_percent * def / 100;
		def += def_flat;

		return def;
	}

	calculateEsperSpd(esper, relics) {
		let spd = esper.spd;
		let spd_flat = 0;
		let spd_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'SPD') {
				spd_flat += relic.main_stat.value;
			} else if (relic.main_stat.stat === 'SPD Bonus') {
				spd_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Wind Walker') {
				spd_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'SPD') {
					spd_flat += sub_stat.value;
				} else if (sub_stat.stat === 'SPD Bonus') {
					spd_percent += sub_stat.value;
				}
			});
		});

		spd += spd_percent * spd / 100;
		spd += spd_flat;

		return spd;
	}

	calculateEsperCritRate(esper, relics) {
		let crit_rate = esper.crit_rate;
		let crit_rate_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'C.RATE') {
				crit_rate_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Fiery Incandescence') {
				crit_rate_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'C.RATE') {
					crit_rate_percent += sub_stat.value;
				}
			});
		});

		crit_rate += crit_rate_percent;

		return crit_rate;
	}

	calculateEsperCritDmg(esper, relics) {
		let crit_dmg = esper.crit_dmg;
		let crit_dmg_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'C.DMG') {
				crit_dmg_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Hammer of Thor') {
				crit_dmg_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'C.DMG') {
					crit_dmg_percent += sub_stat.value;
				}
			});
		});

		crit_dmg += crit_dmg_percent;

		return crit_dmg;
	}

	calculateEsperResist(esper, relics) {
		let resist = esper.resist;
		let resist_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'RESIST') {
				resist_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Immensus Peak') {
				resist_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'RESIST') {
					resist_percent += sub_stat.value;
				}
			});
		});

		resist += resist_percent;

		return resist;
	}

	calculateEsperAccuracy(esper, relics) {
		let accuracy = esper.accuracy;
		let accuracy_percent = 0;

		relics.forEach(relic => {
			if (relic.main_stat.stat === 'ACC') {
				accuracy_percent += relic.main_stat.value;
			} else if (relic.set.name === 'Apollo\'s Bow') {
				accuracy_percent += relic.set.set_bonus;
			} 

			relic.sub_stats.forEach(sub_stat => {
				if (sub_stat.stat === 'ACC') {
					accuracy_percent += sub_stat.value;
				}
			});
		});

		accuracy += accuracy_percent;

		return accuracy;
	}

}

module.exports = EsperStatsCalculation;