import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Pets from '../api/Pets';
import useIntersect from '../utils/useIntersect';

const CollectionPet = ({
  href, level, quality, health, power, speed,
}) => {
  const token = useSelector((state) => state.token);
  const [infos, setInfos] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      Pets(href, token).then((data) => {
        setInfos(data);
      });
    }
  }, [entry.isIntersecting, fetched, href, infos, token]);

  return (
    <div ref={ref}>
      {infos
        ? (
          <>
            <h2>
              <img src={infos.icon} alt={infos.name} />
              {infos.name}
            </h2>
            <p>{infos.description}</p>
            <p>{infos.source}</p>
            <p>{`Level: ${level}`}</p>
            <p>{`Quality: ${quality}`}</p>
            <p>{`Type: ${infos.battle_pet_type}`}</p>
            <p>{`Health: ${health} Power: ${power} Speed: ${speed}`}</p>
            <img src={infos.img} alt={infos.name} />
          </>
        ) : <p>Loading...</p>}
    </div>
  );
};

CollectionPet.propTypes = {
  href: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  quality: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
};

export default CollectionPet;
