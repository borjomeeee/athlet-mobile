import React from 'react';

import s from '@borjomeeee/rn-styles';
import {HSpacer, Text, View} from 'src/Components/Common';
import {DefaultInput} from 'src/Components/Inputs';
import {useRecoilValue} from 'recoil';
import {searchInputStoreFamily} from '../Store';
import {useSelectExerciseController} from '../Hooks';

interface HeaderProps {
  id: string;
}
export const Header: React.FC<HeaderProps> = ({id}) => {
  const searchValue = useRecoilValue(searchInputStoreFamily(id));
  const {handleChangeSearchValue} = useSelectExerciseController(id);

  return (
    <View style={s(`container`)}>
      <HSpacer size={10} />
      <Text style={s(`text fsz:20 medium`)}>Выберите упражнение</Text>
      <HSpacer size={10} />
      <DefaultInput
        value={searchValue}
        onChangeText={handleChangeSearchValue}
        placeholder="Введите название упражнения ..."
      />
    </View>
  );
};
