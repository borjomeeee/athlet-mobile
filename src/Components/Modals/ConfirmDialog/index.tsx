import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HSpacer, Text, View, VSpacer} from 'src/Components/Common';
import {GithubButton} from 'src/Components/Pressable';

import {useModalInternal} from 'src/Lib/ModalRouter';

export interface ConfirmDialogProps {
  id: string;

  title: string;
  description: string;

  acceptText: string;
  cancelText: string;

  onCancel?: () => void;
  onAccept?: () => void;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  id,

  title,
  description,

  acceptText,
  cancelText,

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
      <View style={s(`abs container b:0 r:0 l:0`)}>
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={s(`br:10 pv:10 pr:20 pl:15 bgc:white`)}>
          <Text style={s(`medium`)}>{title}</Text>
          <HSpacer size={15} />
          <Text>{description}</Text>
          <HSpacer size={15} />
          <View style={s(`row asfe`)}>
            <GithubButton
              onPress={handlePressCancel}
              label={cancelText}
              variant="secondary"
              mini
            />
            <VSpacer size={10} />
            <GithubButton onPress={handlePressAccept} label={acceptText} mini />
          </View>
        </Animated.View>

        <HSpacer size={bottom + 100} />
      </View>
    </Animated.View>
  );
};
