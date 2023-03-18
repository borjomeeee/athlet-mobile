import React from 'react';
import {BackHandler} from 'react-native';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {ShowableContext, ShowableInstanceContext} from './Context';
import {
  componentsFamily,
  getRefForComponent,
  useShowablePortalStore,
} from './Store';
import {ShowableComponentPortalRef, ShowableComponentProps} from './Types';

export interface ShowablePortalProps {
  id: string;
  handleBackAction?: boolean;
}

export const ShowablePortal = React.forwardRef<
  ShowableComponentPortalRef,
  ShowablePortalProps
>(function ({id, handleBackAction}, ref) {
  const components = useRecoilValue(componentsFamily(id));
  const {addComponent, updateComponent, removeComponent, getComponents} =
    useShowablePortalStore(id);

  const show = React.useCallback(
    <T,>(
      componentId: string,
      Component: React.FC<T & ShowableComponentProps>,
      props: Exclude<T, ShowableComponentProps>,
    ) => {
      addComponent({id: componentId, Component, props});
    },
    [addComponent],
  );

  const update = React.useCallback(
    <T,>(componentId: string, props: T) => {
      updateComponent(componentId, props);
    },
    [updateComponent],
  );

  const close = useRecoilCallback(
    ({get}) =>
      (componentId: string) => {
        const currentComponents = get(componentsFamily(id));
        const component = currentComponents.find(c => c.id === componentId);

        if (!component) {
          return;
        }

        const cRef = getRefForComponent(id, component.instanceId);
        cRef?.current?.close()?.then(() => removeComponent(componentId));
      },
    [removeComponent],
  );

  React.useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        const currentComponents = getComponents();
        if (handleBackAction && currentComponents.length !== 0) {
          close(currentComponents[currentComponents.length - 1].id);
        }

        return false;
      },
    );

    return () => handler.remove();
  }, [getComponents, close, handleBackAction]);

  const value = React.useMemo(
    () => ({portalId: id, show, update, close}),
    [show, update, close, id],
  );

  React.useImperativeHandle(
    ref,
    React.useCallback(() => ({show, update, close}), [show, update, close]),
  );

  return (
    <ShowableContext.Provider value={value}>
      {components.map(component => {
        const Component = component.Component;

        return (
          <React.Fragment key={component.instanceId}>
            <MemoShowableInstanceContext
              id={component.id}
              props={component.props}>
              <Component
                id={component.id}
                componentRef={getRefForComponent(id, component.instanceId)}
                {...component.props}
              />
            </MemoShowableInstanceContext>
          </React.Fragment>
        );
      })}
    </ShowableContext.Provider>
  );
});

const MemoShowableInstanceContext: React.FC<{
  id: string;
  props: any;
  children: React.ReactNode;
}> = React.memo(
  ({id, props, children}) => {
    return (
      <ShowableInstanceContext.Provider value={{id, props}}>
        {children}
      </ShowableInstanceContext.Provider>
    );
  },
  (prevProps, props) =>
    prevProps.id === props.id && prevProps.props === props.props,
);

export const bottomSheetsShowablePortal =
  React.createRef<ShowableComponentPortalRef>();

export const notificationsShowablePortal =
  React.createRef<ShowableComponentPortalRef>();

export const confirmDialogShowablePortal =
  React.createRef<ShowableComponentPortalRef>();
