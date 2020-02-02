import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import request from '../../utils/Request';
import AxiosHeader from '../../utils/AxiosHeader';
import Specialization from '../../api/Specialization';
import Stuff from '../../api/Stuff';
import HomeProfile from '../../components/Home/HomeProfile';
// import HomeStats from '../../components/HomeStats';
import HomeStuff from '../../components/Home/HomeStuff';
// import HomePvp from '../../components/HomePvp';
import HomeSpe from '../../components/Home/HomeSpe';
import './HomeContainer.scss';

const Home = () => {
  const [profil, setProfil] = useState({});
  // const [stats, setStats] = useState({});
  const [stuff, setStuff] = useState([]);
  const [race, setRace] = useState({});
  const [realm, setRealm] = useState({});
  const [media, setMedia] = useState({});
  const [activTitle, setTitles] = useState({});
  // const [pvp, setPvp] = useState({});
  const [spe, setSpe] = useState([]);
  const [activSpe, setActivSpe] = useState({});

  const pseudo = useSelector((state) => state.profil.pseudo);
  const realmSlug = useSelector((state) => state.profil.realmslug);
  const region = useSelector((state) => state.profil.region);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      const header = AxiosHeader(token);

      const getProfil = await request(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${pseudo}?namespace=profile-${region}&locale=fr_EU`, header);
      const getSpe = Specialization(getProfil.data, header);

      // Profil
      const getRace = request(getProfil.data.race.key.href, header);
      const getRealm = request(getProfil.data.realm.key.href, header);
      const getMedia = request(getProfil.data.media.href, header);
      const getActivSpe = request(getProfil.data.active_spec.key.href, header);

      // Statistics
      const getStats = request(getProfil.data.statistics.href, header);

      // Titles
      const getTitles = request(getProfil.data.active_title.key.href, header);

      // Stuff
      const getStuff = Stuff(getProfil.data.equipment.href, token);

      // Pvp
      const getPvp = request(getProfil.data.pvp_summary.href, header);
      setProfil(getProfil.data);

      // eslint-disable-next-line max-len
      Promise.all([getRace, getRealm, getMedia, getStats, getTitles, getStuff, getPvp, getSpe, getActivSpe]).then((result) => {
        // setStats(result[3].data);
        setStuff(result[5].data);
        setRace(result[0].data);
        setRealm(result[1].data);
        setMedia(result[2].data);
        setTitles(result[4].data);
        // setPvp(result[6].data);
        setSpe(result[7].data);
        setActivSpe(result[8].data);
      });
    };
    if (pseudo && realmSlug && region && token) {
      fetchData();
    }
  }, [pseudo, realmSlug, region, token]);
  return (
    <div className="home-container">
      {activSpe.name
        ? (
          <HomeProfile
            profile={profil}
            race={race}
            realm={realm}
            media={media}
            activSpe={activSpe}
            activTitle={activTitle}
          />
        )
        : (
          <div className="profile-item item" />
        )}
      {spe
        ? (
          <HomeSpe spe={spe} />
        )
        : <div className="item spec-item">Specialization</div>}
      {stuff
        ? (
          <HomeStuff stuff={stuff} />
        )
        : <div className="item stuff-item shadow">Equipement</div>}

      <div className="item raid-item shadow">
        <span>En cours de réalisation</span>
      </div>
    </div>
  );
};

export default Home;
