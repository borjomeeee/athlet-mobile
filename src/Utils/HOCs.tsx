import React from 'react';

// Used to memo content with static hooks
export const withHooks = <Props,>(
  hooks: ((...args: any[]) => any)[],
  FC: React.FC<Props>,
) => {
  const MemoFC = React.memo(FC);
  return (props: Props) => {
    hooks.forEach(hook => hook());
    return <MemoFC {...(props as any)} />;
  };
};
