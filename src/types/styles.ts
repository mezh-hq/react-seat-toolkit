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
  operations?: {
    root?: IStyle;
    input?: IStyle;
    trigger?: IStyle;
  };
  footer: {
    root?: IStyle;
    title?: IStyle;
    meta?: IStyle;
  };
  elements?: {
    all?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
    seats?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
    text?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
  };
  core?: {
    button?: IStyle;
  };
}
