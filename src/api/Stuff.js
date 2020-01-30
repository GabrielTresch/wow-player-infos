/* eslint-disable max-len */
import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const Stuff = async (href, token) => {
  const stuffArray = [];

  const header = AxiosHeader(token);

  const getStuff = await request(href, header);

  await Promise.all(getStuff.data.equipped_items.map(async (value) => {
    console.log(value);
    const media = await request(`https://eu.api.blizzard.com/data/wow/media/item/${value.item.id}?namespace=static-eu&locale=fr_EU`, header);
    stuffArray.push({
      slot: value.slot.name.fr_FR,
      azerite: value.azerite_details !== undefined && value.azerite_details.level === undefined ? 'azerite' : false,
      icon: media.data.assets[0].value,
      quality: value.quality.name.en_US,
      name: value.name.fr_FR,
      description: value.name_description && value.name_description.fr_FR,
      level: value.level.value,
      binding: value.binding.name.fr_FR,
      durability: value.durability && value.durability.display_string.fr_FR,
      levelRequired: value.requirements && value.requirements.level.display_string.fr_FR,
      price: value.sell_price && `${value.sell_price.display_strings.header.fr_FR} ${value.sell_price.display_strings.gold.fr_FR} gold ${value.sell_price.display_strings.silver.fr_FR} silver ${value.sell_price.display_strings.copper.fr_FR} copper`,
    });
  }));
  return { data: stuffArray };
};

export default Stuff;
