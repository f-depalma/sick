import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  isVerified,
  status,
  handleClick,
  log,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{company}</TableCell>
      <TableCell>
        <Label
          color={
            (status === 'Error' && 'error') || (status === 'Warning' && 'warning') || 'success'
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell>{log}</TableCell>

      <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  log: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
