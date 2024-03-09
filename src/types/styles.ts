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
  zoomControls?: {
    in?: IStyle;
    out?: IStyle;
    buttons?: IStyle;
    root?: IStyle;
  };
  panControls?: {
    wheel?: {
      outerRing?: IStyle;
      innerRing?: IStyle;
    };
    handles?: {
      up?: IStyle;
      right?: IStyle;
      down?: IStyle;
      left?: IStyle;
    };
  };
  elements?: {
    booth?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
    seat?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
    shape?: {
      selected?: IStyle;
      unselected?: IStyle;
    };
    image?: {
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
