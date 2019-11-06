import React from 'react';
import PropTypes from 'prop-types';

const HomeSpe = ({ spe }) => (
  <>
    <h2>Specialization</h2>
    {spe.map((value) => (
      <div key={value.specialization}>
        <h4>
          <img src={value.media} alt={value.specialization} />
          <p>{`${value.active === 'active' ? '( Active )' : ''} ${value.specialization} - ${value.role}`}</p>
        </h4>
        <ul>
          {value.talents.map((val) => (
            <div key={val.level}>
              <li>{val.level}</li>
              <ol>
                {val.talent.map((tal) => (
                  <li key={tal.talent}>
                    <h4>{`${tal.active === 'active' ? '( Active )' : ''} ${tal.talent}`}</h4>
                    <p>{`- Description: ${tal.description}`}</p>
                    <p>{`- CastTime: ${tal.castTime}`}</p>
                    <p>{`- Cooldown: ${tal.cooldown}`}</p>
                    <p>{`- Cost: ${tal.cost}`}</p>
                    <p>{`- Range: ${tal.range}`}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </ul>
        {value.pvpTalents.length > 0
          && (
            <>
              <h4>PvpTalents</h4>
              <ul>
                {value.pvpTalents.map((pvpTal) => (
                  <li key={pvpTal.talent}>{pvpTal.talent}</li>
                ))}
              </ul>
            </>
          )}
      </div>
    ))}
  </>
);

HomeSpe.propTypes = {
  spe: PropTypes.array.isRequired,
};

export default HomeSpe;
