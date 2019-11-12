import React from 'react';
import PropTypes from 'prop-types';

const Reputation = ({ reputation, subReputation }) => (
  <>
    {reputation.map((value) => (
      <div key={value.name}>
        <h2>{value.name}</h2>
        {value.reputation.map((val) => (
          <div key={val.name}>
            <p>{`${val.name} ${val.value}/${val.max} ${val.etat}`}</p>
          </div>
        ))}
        {subReputation.map((e) => (
          <div key={e.name}>
            {e.parentCategory === value.name
              && (
              <>
                <h3>{e.name}</h3>
                {e.subReput.map((el) => (
                  <div key={el.name}>
                    <p>{`${el.name} ${el.value}/${el.max} ${el.etat}`}</p>
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
