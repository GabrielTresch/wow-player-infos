import request from './Request';

async function Specialization(data, header) {
  const speArray = [];
  const activTalents = [];
  let talentsArray = [];
  let talentArray = [];
  let mediaArray = [];
  const pvpTalentsArray = [];
  let talentPvpArray = [];

  const specActive = await request(data.active_spec.key.href, header);
  const spec = await request(data.specializations.href, header);
  spec.data.specializations.forEach((el) => {
    if (el.talent !== undefined) {
      el.talents.forEach((element) => {
        activTalents.push(element.talent.name.fr_FR);
      });
    }
    if (el.pvp_talent_slots !== undefined) {
      el.pvp_talent_slots.forEach(async (pvpEl) => {
        pvpTalentsArray.push({
          spe: el.specialization.name.fr_FR,
          pvpTalent: pvpEl.selected.talent.name.fr_FR,
        });
      });
    }
  });

  const playableClass = await request(specActive.data.playable_class.key.href, header);

  playableClass.data.specializations.forEach(async (e) => {
    const getSpe = await request(e.key.href, header);
    const media = await request(getSpe.data.media.key.href, header);
    media.data.assets.forEach((speImg) => {
      mediaArray.push(speImg.value);
    });

    pvpTalentsArray.forEach((pvpE) => {
      if (pvpE.spe === getSpe.data.name.fr_FR) {
        talentPvpArray.push({
          talent: pvpE.pvpTalent,
        });
      }
    });

    getSpe.data.talent_tiers.forEach((val) => {
      val.talents.forEach((value) => {
        talentArray.push({
          talent: value.talent.name.fr_FR,
          description: value.spell_tooltip.description.fr_FR,
          castTime: value.spell_tooltip.cast_time.fr_FR,
          cooldown: value.spell_tooltip.cooldown ? value.spell_tooltip.cooldown.fr_FR : '',
          range: value.spell_tooltip.range ? value.spell_tooltip.range.fr_FR : '',
          cost: value.spell_tooltip.power_cost ? value.spell_tooltip.power_cost.fr_FR : '',
          active: activTalents.includes(value.talent.name.fr_FR) ? 'active' : 'desactive',
        });
      });
      talentsArray.push({
        level: val.level,
        talent: talentArray,
      });
      talentArray = [];
    });
    speArray.push({
      specialization: getSpe.data.name.fr_FR,
      role: getSpe.data.role.name.fr_FR,
      media: mediaArray,
      talents: talentsArray,
      pvpTalents: talentPvpArray,
      active: getSpe.data.name.fr_FR === spec.data.active_specialization.name.fr_FR ? 'active' : 'desactive',
    });
    talentsArray = [];
    mediaArray = [];
    talentPvpArray = [];
  });
  return speArray;
}

export default Specialization;
