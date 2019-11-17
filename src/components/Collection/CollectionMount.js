import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Mounts from '../../api/Mounts';
import useIntersect from '../../utils/useIntersect';
import './CollectionMount.scss';
import '../../assets/scss/loader.scss';

const CollectionMount = ({ id, href }) => {
  const token = useSelector((state) => state.token);
  const [infos, setInfos] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      Mounts(href, token).then((data) => {
        setInfos(data);
      });
    }
  }, [entry.isIntersecting, fetched, href, infos, token]);

  return (
    <div ref={ref} id={id} className="mount-img-container">
      {infos
        ? (
          <img src={infos.img} alt={infos.name} />
        ) : (
          <div className="showbox">
            <div className="loader">
              <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
              </svg>
            </div>
          </div>
        )}
    </div>
  );
};

CollectionMount.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default CollectionMount;
