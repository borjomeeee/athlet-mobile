import React from 'react';
import {RecoilValue, useRecoilValue} from 'recoil';

export const getKeyFabricForDomain = (domain: string) => (key: string) =>
  `[${domain}] ${key}`;

export const RecoilObserver: React.FC<{
  node: RecoilValue<unknown>;
  onChange: <T>(newValue: T) => void;
}> = ({node, onChange}) => {
  const value = useRecoilValue(node);
  React.useEffect(() => onChange(value), [onChange, value]);
  return null;
};
