import s from '@borjomeeee/rn-styles';

import React from 'react';
import {HSpacer, Text} from 'src/Components';
import {View} from 'src/Components/Common';
import {SelectTimeWheel} from 'src/Components/Custom';
import {Submit} from './Views/Submit';
import {useSelectRestController} from './Hooks';
import {SelectRestProps} from './Types';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';

export const SelectRest = bottomSheet<SelectRestProps>(
  ({id, defaultRest}) => {
    const {handleChangeRest, reset} = useSelectRestController(id);

    React.useEffect(() => () => reset(), [reset]);

    return (
      <View style={s(`container`)}>
        <HSpacer size={5} />
        <Text style={s(`text fsz:20 medium`)}>Выберите время отдыха</Text>

        <HSpacer size={30} />
        <View style={s(`aic`)}>
          <SelectTimeWheel
            onChangeValue={handleChangeRest}
            defaultValue={defaultRest}
          />
        </View>
        <HSpacer size={50} />
        <Submit id={id} />
      </View>
    );
  },
  {
    snapPoints: ['CONTENT_HEIGHT'],
    dynamic: true,
  },
);
