export type ShowableComponentInstanceRef = {
  close: () => void | Promise<void>;
};

export interface ShowableComponentProps {
  id: string;
  componentRef: React.RefObject<ShowableComponentInstanceRef>;
}

export interface ShowableComponent<Props> {
  id: string;
  instanceId: string;
  Component: React.FC<Props & Partial<ShowableComponentProps>>;
  props: Props;
}

export type ShowableComponentPortal = {
  portalId: string;
  show: <Props>(
    id: string,
    Component: React.FC<Props & ShowableComponentProps>,
    props: Exclude<Props, ShowableComponentProps>,
  ) => void;
  update: <Props>(id: string, props: Props) => void;
  close: (id: string) => void;
};

export type ShowableComponentPortalRef = Omit<
  ShowableComponentPortal,
  'portalId'
>;
