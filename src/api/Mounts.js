import request from '../utils/Request';
import AxiosHeader from '../utils/AxiosHeader';

const Mounts = async (href, token) => {
  const header = AxiosHeader(token);
  const mount = await request(href, header);
  const mountImg = await request(mount.data.creature_displays[0].key.href, header);
  const mountArray = {
    name: mount.data.name.fr_FR,
    description: mount.data.description.fr_FR,
    source: mount.data.source ? mount.data.source.name.fr_FR : '',
    icon: mountImg.data.assets[0].value,
    img: mountImg.data.assets[2].value,
  };
  return mountArray;
};

export default Mounts;
