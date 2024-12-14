export type ThemeModeProp  = 'light' | 'dark' | 'system';

export type ThemeProps = {
  mode: ThemeModeProp;
  label: string;
  icon: React.JSX.Element
}
