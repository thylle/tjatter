const colors = {
  white: '#fff',
  black: '#2b2b2b',
  grayDark: '#aaa',
  gray: '#ccc',
  grayLight: '#e3e3e3',
  grayLighter: '#f5f5f5',
  bodyBg: '#f3f6ff',
}

const variables = {
  defaultSpacingXs: '5px',
  defaultSpacingSm: '10px',
  defaultSpacing: '20px',
  safeAreaSpacing: '60px',
  safeAreaSpacingLg: '100px',
  inputAreaHeight: '100px',
  borderRadiusDefault: '8px',
  borderRadiusLg: '30px',
  messageMaxWidth: '90%',

  primary: '#b935fc',
  primaryLight: '#786c97',
  primaryBgTextColor: '#f5f3ff',
  secondary: '#7b42eb',
  secondaryBgTextColor: 'white',
  lime: '#04eec0',
  chatBg: '#edf6f7',

  bodyBg: colors.bodyBg,
  textColor: 'black',
  textColorLight: '#444',
  messagesBg: colors.bodyBg,
  singleMessageBg: colors.white,
}

const theme = {
  ...colors,
  ...variables,
}

export default theme
