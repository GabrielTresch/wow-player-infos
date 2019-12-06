import React from 'react';
import PropTypes from 'prop-types';
import './Reputation.scss';

const Reputation = ({ reputation, subReputation }) => (
  <>
    {reputation.map((value) => (
      <div key={value.name} className="reputation-container">
        <h2>{value.name}</h2>
        {value.reputation.map((val) => (
          <div key={val.name} className="reputation-content">
            <h4 className="reputation-category">{val.name}</h4>
            <div className={val.etat === 'Exalté' ? 'reputation-jauge reputation-exalte' : 'reputation-jauge'}>
              {val.etat !== 'Exalté' ? (
                <span>{`${val.value}/${val.max}`}</span>
              ) : false}
              <div className="jauge-content" style={{ width: `${(val.value / val.max) * 100}%` }} />
            </div>
            <span className="reputation-etat">{val.etat}</span>
          </div>
        ))}
        {subReputation.map((e) => (
          <div key={e.name}>
            {e.parentCategory === value.name
              && (
                <>
                  <h3 className="reputation-subcategory">{e.name}</h3>
                  {e.subReput.map((el) => (
                    <div key={el.name} className="reputation-content">
                      <h4 className="reputation-category">{el.name}</h4>
                      <div className="reputation-jauge">
                        {el.etat !== 'Exalté' ? <span>{`${el.value}/${el.max}`}</span> : false}
                        <div className="jauge-content" style={{ width: `${(el.value / el.max) * 100}%` }} />
                      </div>
                      <span className="reputation-etat">{el.etat}</span>
                    </div>
                  ))}
                </>
              )}
          </div>
        ))}
      </div>
    ))}
  </>
);

Reputation.propTypes = {
  reputation: PropTypes.array.isRequired,
  subReputation: PropTypes.array.isRequired,
};

export default Reputation;
