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

export interface ConfirmDialogProps {
  title: string;
  description: string;

  acceptText: string;
  cancelText: string;

  onCancel?: () => void;
  onAccept?: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,

  acceptText,
  cancelText,

  onCancel,
  onAccept,
}) => {
  const {bottom} = useSafeAreaInsets();

  const handlePressCancel = React.useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const handlePressAccept = React.useCallback(() => {
    onAccept?.();
  }, [onAccept]);

  return (
    <View style={s(`abs t:0 r:0 b:0 l:0`)}>
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
              <GithubButton
                onPress={handlePressAccept}
                label={acceptText}
                mini
              />
            </View>
          </Animated.View>

          <HSpacer size={bottom + 100} />
        </View>
      </Animated.View>
    </View>
  );
};
