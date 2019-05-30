import React from 'react';

import '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = props => {
  let iconStyle;
  if (props.liked) {
    iconStyle = 'fas';
  } else {
    iconStyle = 'far';
  }
  return (
    <React.Fragment>
      <FontAwesomeIcon className="clickable" onClick={props.onClick} icon={[iconStyle, 'heart']} />
    </React.Fragment>
  );
};

export default Like;
