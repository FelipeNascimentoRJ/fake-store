import React, {createElement} from 'react';

import * as Icons from './styles';

export type IconProps = {
  name: keyof typeof Icons;
};

const Icon: React.FC<IconProps> = ({name}) => {
  const iconComponent = Icons[name];

  return createElement(iconComponent, {}, null);
};

export default React.memo(Icon);
