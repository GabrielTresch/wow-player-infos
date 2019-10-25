import React from 'react';
import PropTypes from 'prop-types';

const HomeStuff = ({ stuff }) => (
  <>
    <h2>Stuff</h2>
    {stuff.equipped_items !== undefined
      ? (
        stuff.equipped_items.map((value) => (
          <div key={value.name.fr_FR}>
            {value !== undefined
              && value.name.fr_FR !== undefined
              && value.slot.name.fr_FR !== undefined
              && value.quality.name.fr_FR !== undefined
              && value.level.display_string.fr_FR !== undefined
              && value.binding.name.fr_FR !== undefined
              && value.requirements.level.display_string.fr_FR !== undefined
              ? (
                <>
                  <h3>{`${value.slot.name.fr_FR} (${value.quality.name.fr_FR})`}</h3>
                  <ul>
                    <li>{value.name.fr_FR}</li>
                    {value.name_description !== undefined
                      && (<li>{value.name_description.fr_FR}</li>)}
                    <li>{value.level.display_string.fr_FR}</li>
                    {value.transmog !== undefined
                      && (<li>{value.transmog.display_string.fr_FR}</li>)}
                    <li>{value.binding.name.fr_FR}</li>
                    {value.durability !== undefined
                      && (<li>{value.durability.display_string.fr_FR}</li>)}
                    <li>{value.requirements.level.display_string.fr_FR}</li>
                    {value.sell_price !== undefined
                      && (<li>{`${value.sell_price.display_strings.header.fr_FR} ${value.sell_price.display_strings.gold.fr_FR} gold ${value.sell_price.display_strings.silver.fr_FR} silver ${value.sell_price.display_strings.copper.fr_FR} copper`}</li>)}
                  </ul>
                </>
              )
              : <p>Loading...</p>}
          </div>
        ))
      )
      : <p>Loading</p>}
  </>
);

HomeStuff.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default HomeStuff;
