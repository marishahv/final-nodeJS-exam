import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import capitalize from 'lodash/capitalize';
import noop from 'lodash/noop';
import './resultTable.css'

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  button: {
    margin: '15px',
    whiteSpace: 'noWrap'
  }
});

const createData = (id, type, power, speed, color) => {
  return { id, type, power, speed, color };
}

const ResultsTable = ({ results, onDeleteClick, onMoreInfoClick, onUpdateClick }) => {
  const classes = useStyles();
  const rows = results.map(({ id, CarBody: { type }, Engine: { power }, speed, color}) => createData(id, type, power, speed, color));

  return (
    <div className={classes.root}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Car ID</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Engine</TableCell>
            <TableCell align="left">Speed</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{capitalize(row.type)}</TableCell>
              <TableCell align="left">{row.power}</TableCell>
              <TableCell align="left">{row.speed}</TableCell>
              <TableCell align="left">{capitalize(row.color)}</TableCell>
              <TableCell align="right">
                <figure className='actions'>
                  <Button className={classes.button} onClick={() => onMoreInfoClick(row.id)} variant="contained" sx={{whiteSpace:'nowrap'}}>More info</Button>
                  <Button className={classes.button} onClick={() => onUpdateClick(row.id)} variant="contained">Update</Button>
                  <Button  className={classes.button} onClick={() => onDeleteClick(row.id)} variant="contained">Delete</Button>
                </figure>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={5}
      page={0}
      onChangePage={noop}
    />
    </div>
  );
}

export default ResultsTable;
