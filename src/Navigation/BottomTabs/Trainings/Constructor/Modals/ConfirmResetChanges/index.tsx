import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as UI from 'src/Components';
import {useModalInternal} from 'src/Lib/ModalRouter';

interface ConfirmResetChangesProps {
  id: string;

  onCancel?: () => void;
  onAccept?: () => void;
}
export const ConfirmResetChanges: React.FC<ConfirmResetChangesProps> = ({
  id,

  onCancel,
  onAccept,
}) => {
  const {_onClose} = useModalInternal(id);
  const {bottom} = useSafeAreaInsets();

  const handlePressCancel = React.useCallback(() => {
    onCancel?.();
    _onClose();
  }, [onCancel, _onClose]);

  const handlePressAccept = React.useCallback(() => {
    onAccept?.();
    _onClose();
  }, [onAccept, _onClose]);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={s(`fill bgc:#00000050`)}>
      <UI.View style={s(`abs container b:0 r:0 l:0`)}>
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={s(`br:10 pv:10 pr:20 pl:15 bgc:white`)}>
          <UI.Text style={s(`medium`)}>Отмена создания тренировки</UI.Text>
          <UI.HSpacer size={15} />
          <UI.Text>
            Вы действительно хотите выйти из режима создания тренировки?
          </UI.Text>
          <UI.HSpacer size={15} />
          <UI.View style={s(`row asfe`)}>
            <UI.GithubButton
              onPress={handlePressCancel}
              label="Отмена"
              variant="secondary"
              mini
            />
            <UI.VSpacer size={10} />
            <UI.GithubButton
              onPress={handlePressAccept}
              label="Да, хочу"
              mini
            />
          </UI.View>
        </Animated.View>

        <UI.HSpacer size={bottom + 100} />
      </UI.View>
    </Animated.View>
  );
};
