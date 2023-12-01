import React from 'react';

type Props = {
  id: string | undefined;
  hidden: boolean;
  refRespond:  React.RefObject<HTMLDivElement>;
}

export const Respond: React.FC<Props> = ({ id, hidden, refRespond }) => {
  // const showBlock = hidden ? '0' : '1';

  return (
    <div ref={refRespond} hidden={hidden} className="respond">
      Calendar {id}
    </div>
  );
};
