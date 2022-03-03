/**
 * Checks if the page is expiring
 * The imports which are required for this page to run which includes packages from React.
 */

import React, { useEffect, useState } from "react";

const Expire = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? <div>{props.children}</div> : null;
};

export default Expire;