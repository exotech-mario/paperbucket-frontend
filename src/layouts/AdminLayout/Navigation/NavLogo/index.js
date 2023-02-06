import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.svg';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo" style={{ backgroundColor: 'white' }}>
        <img src={Logo} alt="Your SVG" style={{ width: '80%' }} />
        {/* 
        <Link to="#" className="b-brand">
          <div className="b-bg">
            <img src={Logo} alt="Your SVG" />
          </div>
          <span className="b-title">Datta Able</span>
        </Link> */}
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
