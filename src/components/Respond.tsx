import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';


type Props = {
  hidden: boolean;
  refRespond:  React.RefObject<HTMLDivElement>;
}

export const Respond: React.FC<Props> = ({ hidden, refRespond }) => {
  const showBlock = hidden ? '0' : '1';
  const displayNone = hidden ? 'none' : 'block';

  const today = dayjs();

  return (
    <div ref={refRespond} hidden={hidden} style={{ opacity: showBlock, display: displayNone }} className="respond">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker disablePast={true} defaultValue={today} />
      </LocalizationProvider>
    </div>
  );
};
