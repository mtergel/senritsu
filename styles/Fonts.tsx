import { Global } from "@emotion/react";

const Fonts = () => {
  return (
    <Global
      styles={`
        
        
        /* open-sans-300 - latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 300;
          src: url('./fonts/open-sans-v18-latin-300.eot'); /* IE9 Compat Modes */
          src: local(''),
               url('./fonts/open-sans-v18-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('./fonts/open-sans-v18-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
               url('./fonts/open-sans-v18-latin-300.woff') format('woff'), /* Modern Browsers */
               url('./fonts/open-sans-v18-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
               url('./fonts/open-sans-v18-latin-300.svg#OpenSans') format('svg'); /* Legacy iOS */
        }
        /* open-sans-300italic - latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: italic;
          font-weight: 300;
          src: url('./fonts/open-sans-v18-latin-300italic.eot'); /* IE9 Compat Modes */
          src: local(''),
               url('./fonts/open-sans-v18-latin-300italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('./fonts/open-sans-v18-latin-300italic.woff2') format('woff2'), /* Super Modern Browsers */
               url('./fonts/open-sans-v18-latin-300italic.woff') format('woff'), /* Modern Browsers */
               url('./fonts/open-sans-v18-latin-300italic.ttf') format('truetype'), /* Safari, Android, iOS */
               url('./fonts/open-sans-v18-latin-300italic.svg#OpenSans') format('svg'); /* Legacy iOS */
        }
        /* open-sans-regular - latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: url('./fonts/open-sans-v18-latin-regular.eot'); /* IE9 Compat Modes */
          src: local(''),
               url('./fonts/open-sans-v18-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('./fonts/open-sans-v18-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
               url('./fonts/open-sans-v18-latin-regular.woff') format('woff'), /* Modern Browsers */
               url('./fonts/open-sans-v18-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
               url('./fonts/open-sans-v18-latin-regular.svg#OpenSans') format('svg'); /* Legacy iOS */
        }
        /* open-sans-700 - latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 700;
          src: url('./fonts/open-sans-v18-latin-700.eot'); /* IE9 Compat Modes */
          src: local(''),
               url('./fonts/open-sans-v18-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('./fonts/open-sans-v18-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
               url('./fonts/open-sans-v18-latin-700.woff') format('woff'), /* Modern Browsers */
               url('./fonts/open-sans-v18-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
               url('./fonts/open-sans-v18-latin-700.svg#OpenSans') format('svg'); /* Legacy iOS */
        }
        /* open-sans-700italic - latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: italic;
          font-weight: 700;
          src: url('./fonts/open-sans-v18-latin-700italic.eot'); /* IE9 Compat Modes */
          src: local(''),
               url('./fonts/open-sans-v18-latin-700italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('./fonts/open-sans-v18-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */
               url('./fonts/open-sans-v18-latin-700italic.woff') format('woff'), /* Modern Browsers */
               url('./fonts/open-sans-v18-latin-700italic.ttf') format('truetype'), /* Safari, Android, iOS */
               url('./fonts/open-sans-v18-latin-700italic.svg#OpenSans') format('svg'); /* Legacy iOS */
        }

        /* raleway-regular - latin */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/raleway-v19-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('./fonts/raleway-v19-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./fonts/raleway-v19-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('./fonts/raleway-v19-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('./fonts/raleway-v19-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./fonts/raleway-v19-latin-regular.svg#Raleway') format('svg'); /* Legacy iOS */
}
/* raleway-700 - latin */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url('./fonts/raleway-v19-latin-700.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('./fonts/raleway-v19-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./fonts/raleway-v19-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('./fonts/raleway-v19-latin-700.woff') format('woff'), /* Modern Browsers */
       url('./fonts/raleway-v19-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./fonts/raleway-v19-latin-700.svg#Raleway') format('svg'); /* Legacy iOS */
}
        
        `}
    />
  );
};

export default Fonts;
