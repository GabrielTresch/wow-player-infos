import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const Pets = async (href, token) => {
  const header = AxiosHeader(token);
  const pet = await request(href, header);
  const petImg = await request(pet.data.creature_display.key.href, header);
  const petArray = {
    icon: pet.data.icon,
    name: pet.data.name.fr_FR,
    description: pet.data.description.fr_FR,
    battle_pet_type: pet.data.battle_pet_type.name.fr_FR,
    source: pet.data.source ? pet.data.source.name.fr_FR : '',
    img: petImg.data.assets[2].value,
  };
  return petArray;
};

export default Pets;
