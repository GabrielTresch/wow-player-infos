import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const Mounts = async (href) => {
  const header = AxiosHeader('');
  const mount = await request(href, header);
  const mountImg = await request(mount.data.creature_displays[0].key.href, header);

  const mountArray = {
    name: mount.data.name.fr_FR,
    description: mount.data.description.fr_FR,
    source: mount.data.source ? mount.data.source.name.fr_FR : '',
    img: mountImg.data.assets[2].value,
  };
  return mountArray;
};

export default Mounts;
