/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './HomeSpe.scss';

const HomeSpe = ({ spe }) => (
  <div className="spe-container spec-item item shadow">
    <div className="spec-navigation">
      {spe.map((value) => (
        <img key={value.specialization} src={value.media} className={value.active === 'active' ? 'spec-img-active' : 'spec-img'} alt={value.specialization} />
      ))}
    </div>
    <table>
      <tbody>
        {spe.map((value) => (
          value.active === 'active'
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
    {/* {spe.map((value) => (
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
    ))} */}
  </div>
);

HomeSpe.propTypes = {
  spe: PropTypes.array.isRequired,
};

export default HomeSpe;
