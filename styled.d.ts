import 'styled-components';

import {ThemeType} from './src/presentation/theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
