/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomeSpe.scss';

const HomeSpe = ({ spe }) => {
  const [speActive, setSpeActive] = useState();

  useEffect(() => {
    if (!speActive) {
      spe.map((el) => (
        el.active === 'active'
          && (
            setSpeActive(el.specialization)
          )
      ));
    }
  });

  return (
    <div className="spe-container spec-item item shadow">
      <div className="spec-navigation">
        {spe.map((value) => (
          <button type="button" onClick={() => setSpeActive(value.specialization)} key={value.specialization}>
            <img src={value.media} className={value.specialization === speActive ? 'spec-img-active' : 'spec-img'} alt={value.specialization} />
          </button>
        ))}
      </div>
      <table>
        <tbody>
          {spe.map((value) => (
            value.specialization === speActive
          && (
            value.talents.map((val) => (
              <tr key={val.level}>
                <td>{val.level}</td>
                {val.talent.map((element) => (
                  <td key={element.talent} className={element.active === 'active' ? 'active-spell spell' : 'inactif-spell spell'}>
                    <div>
                      <img src="https://render-eu.worldofwarcraft.com/icons/56/ability_druid_improvedtreeform.jpg" alt="spell" />
                      <div>
                        <p>{element.talent}</p>
                        <div className="spell-infos">
                          <span>{element.cooldown !== undefined ? element.cooldown : ' '}</span>
                          <span>{element.castTime !== undefined ? element.castTime : ' '}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )
          ))}
        </tbody>
      </table>
    </div>
  );
};

HomeSpe.propTypes = {
  spe: PropTypes.array.isRequired,
};

export default HomeSpe;
