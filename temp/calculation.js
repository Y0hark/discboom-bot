export default class Calculation {

	// esper calculation methods

	buildEsper(esper, relics) {
		esper.hp = this.calculateEsperHp(esper, relics);
		esper.atk = this.calculateEsperAtk(esper, relics);
		esper.def = this.calculateEsperDef(esper, relics);
		esper.spd = this.calculateEsperSpd(esper, relics);
		esper.crit_rate = this.calculateEsperCritRate(esper, relics);
		esper.crit_dmg = this.calculateEsperCritDmg(esper, relics);
		esper.res = this.calculateEsperRes(esper, relics);
		esper.acc = this.calculateEsperAcc(esper, relics);
	}

	calculateEsperHp(esper, relics) {
		let hp = esper.hp;
		hp += this.calculateEsperHpFromRelics(relics);
		return hp;
	}

	calculateEsperAtk(esper, relics) {
		let atk = esper.atk;
		atk += this.calculateEsperAtkFromRelics(relics);
		return atk;
	}

	calculateEsperDef(esper, relics) {
		let def = esper.def;
		def += this.calculateEsperDefFromRelics(relics);
		return def;
	}

	calculateEsperSpd(esper, relics) {
		let spd = esper.spd;
		spd += this.calculateEsperSpdFromRelics(relics);
		return spd;
	}

	calculateEsperCritRate(esper, relics) {
		let crit_rate = esper.crit_rate;
		crit_rate += this.calculateEsperCritRateFromRelics(relics);
		return crit_rate;
	}

	calculateEsperCritDmg(esper, relics) {
		let crit_dmg = esper.crit_dmg;
		crit_dmg += this.calculateEsperCritDmgFromRelics(relics);
		return crit_dmg;
	}

	calculateEsperRes(esper, relics) {
		let res = esper.res;
		res += this.calculateEsperResFromRelics(relics);
		return res;
	}

	calculateEsperAcc(esper, relics) {
		let acc = esper.acc;
		acc += this.calculateEsperAccFromRelics(relics);
		return acc;
	}

	calculateEsperHpFromRelics(relics) {
		let hp = 0;
		relics.forEach(relic => {
			hp += relic.hp;
		});

		relics.forEach(relic => {
			hp += relic.hp_percent * hp / 100;
		});

		if (relics[4].setStatBonus === 'hp') {
			hp += relics[4].setStatBonusValue;
		}

		return hp;
	}

	calculateEsperAtkFromRelics(relics) {
		let atk = 0;
		let atk_percent = 0;
		relics.forEach(relic => {
			atk += relic.atk;
		});

		relics.forEach(relic => {
			atk_percent += relic.atk_percent;
		});
		if (relics[0].setStatBonus === 'atk') {
			atk_percent += relics[0].setStatBonusValue;
		}
		
		return atk;
	}

	calculateEsperDefFromRelics(relics) {
		let def = 0;
		let def_percent = 0;
		relics.forEach(relic => {
			def += relic.def;
		});

		relics.forEach(relic => {
			def_percent += relic.def_percent;
		});
		if (relics[4].setStatBonus === 'def') {
			def_percent += relics[4].setStatBonusValue;
		}

		def += def_percent * def / 100;

		return def;
	}

	calculateEsperSpdFromRelics(relics) {

		let spd = 0;
		let spd_percent = 0;
		relics.forEach(relic => {
			spd += relic.spd;
		});

		if (relics[0].setStatBonus === 'spd') {
			spd += relics[0].setStatBonusValue;
		}
		spd += spd_percent * spd / 100;

		return spd;

	}

	calculateEsperCritRateFromRelics(relics) {
		let crit_rate = 0;
		relics.forEach(relic => {
			crit_rate += relic.crit_rate;
		});

		return crit_rate;
	}

	calculateEsperCritDmgFromRelics(relics) {
		let crit_dmg = 0;
		relics.forEach(relic => {
			crit_dmg += relic.crit_dmg;
		});

		return crit_dmg;
	}

	calculateEsperResFromRelics(relics) {
		let res = 0;
		relics.forEach(relic => {
			res += relic.res;
		});

		return res;
	}

	calculateEsperAccFromRelics(relics) {
		let acc = 0;
		relics.forEach(relic => {
			acc += relic.acc;
		});

		return acc;
	}

	// relic build methods

	optimizeRelicBuild(relicBuild, subStat1, subStat2, subStat3, subStat4) {
		
		const subStats = [subStat1, subStat2, subStat3, subStat4];

		if (subStats.some("C.RATE", "ACC", "RES")) {
			totalCrate = 0;
			totalAcc = 0;
			totalRes = 0;

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
			});}

		if (totalCrate > 100) {
			
		}

	}

	createRelicBuild(set1, set2, mainStat1, mainStat2, mainStat3, subStat1, subStat2, subStat3, subStat4, optimization) {
		

		let relic1 = this.createRelic(1, "ATK", subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic2 = this.createRelic(2, mainStat1, subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic3 = this.createRelic(3, "DEF", subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic4 = this.createRelic(4, mainStat2, subStat1, subStat2, subStat3, subStat4, set1, optimization, relic_config);
		let relic5 = this.createRelic(5, "HP", subStat1, subStat2, subStat3, subStat4, set2, optimization, relic_config);
		let relic6 = this.createRelic(6, mainStat3, subStat1, subStat2, subStat3, subStat4, set2, optimization, relic_config);

		let relicBuild = [relic1, relic2, relic3, relic4, relic5, relic6];

		optimizeRelicBuild(relicBuild, subStat1, subStat2, subStat3, subStat4);

	}
	
	createRelic(position, main_stat, sub_stat_1, sub_stat_2, sub_stat_3, sub_stat_4, set, optimization, relic_config) {

		let level_1 = 0;
		let level_2 = 0;
		let level_3 = 0;
		let level_4 = 0;
		switch (optimization) {
			case "perfect":
				level_1 = 5;
				level_2 = 0;
				level_3 = 0;
				level_4 = 0;
				break;
			case "good":
				level_1 = 4;
				level_2 = 1;
				level_3 = 0;
				level_4 = 0;
				break;
			case "average":
				level_1 = 3;
				level_2 = 1;
				level_3 = 1;
				level_4 = 0;
				break;
			case "bad":
				level_1 = 2;
				level_2 = 1;
				level_3 = 1;
				level_4 = 1;
				break;
			case "worst":
				level_1 = 1;
				level_2 = 1;
				level_3 = 1;
				level_4 = 2;
				break;
			default:
				break;
		}

		const relicMainStat = this.getMainStat(main_stat, position, relic_config);
		const relicSubStat1 = this.getSubStat(sub_stat_1, level_1, relic_config);
		const relicSubStat2 = this.getSubStat(sub_stat_2, level_2, relic_config);
		const relicSubStat3 = this.getSubStat(sub_stat_3, level_3, relic_config);
		const relicSubStat4 = this.getSubStat(sub_stat_4, level_4, relic_config);
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