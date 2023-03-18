import React from 'react';
import {atomFamily, useRecoilCallback} from 'recoil';
import {createKey} from 'src/Navigation/BottomTabs/Trainings/Constructor/Store';
import {Id} from 'src/Utils/Id';
import {ShowableComponent, ShowableComponentInstanceRef} from '../Types';

const refs: Record<
  string,
  React.MutableRefObject<ShowableComponentInstanceRef>
> = {};

export const componentsFamily = atomFamily({
  key: createKey('components family'),
  default: [] as ShowableComponent<any>[],
});

export const useShowablePortalStore = (id: string) => {
  const addComponent = useRecoilCallback(
    ({get, set}) =>
      (component: Omit<ShowableComponent<any>, 'instanceId'>) => {
        const currentComponents = get(componentsFamily(id));

        if (
          currentComponents.find(exComponent => exComponent.id === component.id)
        ) {
          return;
        }

        const instanceId = Id.generate();
        refs[`Ref(family=${id}, instance=${instanceId})`] =
          React.createRef() as React.MutableRefObject<any>;

        set(componentsFamily(id), [
          ...currentComponents,
          {
            ...component,
            instanceId,
          },
        ]);
      },
    [],
  );

  const updateComponent = useRecoilCallback(
    ({get, set}) =>
      (instanceId: string, props: any) => {
        set(
          componentsFamily(id),
          get(componentsFamily(id)).map(component => {
            return component.id === instanceId
              ? {...component, props}
              : component;
          }),
        );
      },
    [],
  );

  const removeComponent = useRecoilCallback(
    ({get, set}) =>
      (instanceId: string) => {
        set(
          componentsFamily(id),
          get(componentsFamily(id)).filter(
            component => component.id !== instanceId,
          ),
        );
      },
    [],
  );

  const getComponents = useRecoilCallback(
    ({get}) =>
      () => {
        return get(componentsFamily(id));
      },
    [],
  );

  return {addComponent, removeComponent, updateComponent, getComponents};
};

export const getRefForComponent = (
  familyId: string,
  instanceId: string,
): React.MutableRefObject<ShowableComponentInstanceRef> | undefined =>
  refs[`Ref(family=${familyId}, instance=${instanceId})`];
