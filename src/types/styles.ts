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
  zoomControls?: {
    in?: IStyle;
    out?: IStyle;
  };
  panControls?: {
    handles?: {
      up?: IStyle;
      right?: IStyle;
      down?: IStyle;
      left?: IStyle;
    };
  };
  visibilityControls?: {
    buttons?: IStyle;
  };
  reloadButton?: IStyle;
  elements?: {
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
    tooltip?: {
      trigger?: IStyle;
      content?: IStyle;
    };
  };
  dock?: {
    container?: IStyle;
    root?: IStyle;
  };
}
