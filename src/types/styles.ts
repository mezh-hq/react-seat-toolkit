interface IStyle {
  className?: string;
  properties?: React.CSSProperties;
}

export interface IStyles {
  root?: IStyle;
  workspace?: {
    container?: IStyle;
    root?: IStyle;
  };
  toolbar?: {
    root?: IStyle;
    tool?: {
      root?: IStyle;
      icon?: IStyle;
      label?: IStyle;
    };
    divider?: IStyle;
  };
  footer: {
    root?: IStyle;
    title?: IStyle;
    meta?: IStyle;
  };
}
