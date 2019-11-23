import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Mounts from '../../api/Mounts';
import useIntersect from '../../utils/useIntersect';
import './CollectionMount.scss';
import Loader from '../Loader/Loader';
// import '../../assets/scss/loader.scss';

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
    <div ref={ref} id={id} className="mount-vignette">
      {infos
        ? (
          <img src={infos.img} alt={infos.name} />
        ) : (
          <Loader />
        )}
    </div>
  );
};

CollectionMount.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default CollectionMount;
