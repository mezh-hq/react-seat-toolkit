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
  footer?: {
    root?: IStyle;
    title?: IStyle;
    meta?: IStyle;
  };
  zoomControls?: {
    in?: IStyle;
    out?: IStyle;
    root?: IStyle;
  };
  panControls?: {
    root?: IStyle;
    innerRing?: IStyle;
    handles?: {
      up?: IStyle;
      right?: IStyle;
      down?: IStyle;
      left?: IStyle;
    };
  };
  visibilityControls?: {
    root?: IStyle;
    buttons?: IStyle;
  };
  reloadButton?: IStyle;
  elements?: {
    booth?: {
      selected?: IStyle;
      unselected?: IStyle;
      base?: IStyle;
    };
    seat?: {
      selected?: IStyle;
      unselected?: IStyle;
      base?: IStyle;
      icon?: IStyle;
      statusColors?: {
        [key: string]: {
          background?: string;
          label?: string;
        };
      };
    };
    shape?: {
      selected?: IStyle;
      unselected?: IStyle;
      base?: IStyle;
    };
    section?: {
      base?: IStyle;
      freeSeating?: IStyle;
    };
    image?: {
      selected?: IStyle;
      unselected?: IStyle;
      base?: IStyle;
    };
    text?: {
      selected?: IStyle;
      unselected?: IStyle;
      base?: IStyle;
    };
  };
  core?: {
    container?: IStyle;
    button?: IStyle;
  };
}
