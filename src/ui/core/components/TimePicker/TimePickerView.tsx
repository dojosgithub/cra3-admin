import { observer, useLocalObservable } from 'mobx-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';

function TimePickerView() {
  const timePicker = useLocalObservable(() => ({
    date: null as Dayjs | null,
  }));

  const onChange = (newValue: Dayjs | null) => {
    timePicker.date = newValue;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Select Time"
        value={timePicker.date}
        onChange={onChange}
        slotProps={{
          textField: {
            component: TextField, // This is optional, but ensures the correct input field
            fullWidth: true,
            size: 'small',
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default observer(TimePickerView);
