import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useIntersect from '../../utils/useIntersect';
import Pets from '../../api/Pets';
import './CollectionPet.scss';
import Health from '../../img/collection/health.svg';
import Power from '../../img/collection/power.svg';
import Speed from '../../img/collection/speed.svg';

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
    <div ref={ref} className="pet-vignette">
      {infos
        ? (
          <>
            <div className="pet-infos-container">
              <img src={infos.icon} alt={infos.name} className="pet-icon" />
              <div className="pet-infos-content">
                <div className="pet-infos">
                  <h2 className={quality} style={{ color: `var(--${quality})` }}>{infos.name}</h2>
                  <span>{`${infos.battle_pet_type} Level ${level}`}</span>
                </div>
                <div className="pet-stats">
                  <span>
                    <img src={Health} alt="health icon" />
                    {health}
                  </span>
                  <span>
                    <img src={Power} alt="power icon" />
                    {power}
                  </span>
                  <span>
                    <img src={Speed} alt="speed icon" />
                    {speed}
                  </span>
                </div>
              </div>
            </div>
            <p>{infos.description}</p>
            <img src={infos.img} alt={infos.name} className="pet-img" />
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
