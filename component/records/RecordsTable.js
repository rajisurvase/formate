import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Moment from 'react-moment';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Alert, Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import moment from 'moment';
import dayjs from 'dayjs';
import TotalInterestAmount from '../../util/TotalInterestAmount';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'borrowerName',
    numeric: false,
    disablePadding: true,
    label: 'Borrower Name',
  },
  {
    id: 'lenderName',
    numeric: false,
    disablePadding: true,
    label: 'Lender Name',
  },
  {
    id: 'principalAmount',
    numeric: true,
    disablePadding: false,
    label: 'Principal Amount',
  },
  {
    id: 'interestAmount',
    numeric: true,
    disablePadding: false,
    label: 'Interest Amount',
  },
  {
    id: 'roi',
    numeric: true,
    disablePadding: false,
    label: 'ROI(%)',
  },
  {
    id: 'purchaseDate',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'totalAmount',
    numeric: true,
    disablePadding: false,
    label: 'Total Amount',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    //  <Paper elevation={3} sx={{background:"#B2DFFF"}} >
    <TableHead>
    
      <TableRow component={Paper} sx={{background:"#B2DFFF"}}  >
     
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {/* </Paper> */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDeleteSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
       <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
         <Link href="/records/Create" >
            <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Borrower  </Button>
            </Link>
        </Typography> 
           
            </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelected} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
       
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function RecordsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([])
  const [todayDate, setTodayDate] = React.useState(dayjs(new Date()));

  const router = useRouter()
  let query = router?.query?.find

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  function createData(id,borrowerName, lenderName, principalAmount, interestAmount, roi, purchaseDate,status, totalAmount) {
    return {
      id,
      borrowerName,
      lenderName,
      principalAmount,
      interestAmount,
      roi,
      purchaseDate,
      status,
      totalAmount
    };
  }

const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

const handleDelete =(_item)=>{
  if(_item){
    localStorage.setItem("records", JSON.stringify(rows.filter((item)=>item?.id!==_item)))
  setRows([...rows.filter((item)=>item?.id!==_item)])
  } 
}

const handleDeleteSelected =()=>{
    if(selected.length){
    const getupdate = rows?.filter((item)=> !selected.includes( item.id )  )
    setRows(getupdate)
    localStorage.setItem("records", JSON.stringify(getupdate))
    setSelected([])
  }  
}

  React.useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("records"))
    const result = data?.map((item)=>{
      return createData(item?.id, item?.borrowerName, item?.lenderName, item?.principalAmount, item?.interestAmount, item?.roi,item?.purchaseDate,item?.status,item?.totalAmount )
    })
     if(query){
     setRows(result.filter((item)=>item?.borrowerName.toLowerCase().includes(query.toLowerCase()) ))
    }else {
      setRows(result)
    }
  },[query])

  

  return (
    <Box sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteSelected={handleDeleteSelected} />
        <TableContainer>
          <Table 
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage || 0)
            : rows
           )?.map((row, index) => {
                const isItemSelected = isSelected(row?.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const timeDiff = todayDate.diff(row?.purchaseDate)/(1000 * 60 * 60 * 24)
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row?.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer', background:`${index%2===0? "" : "  #CEF3FF"}`  }}
                    component={Paper}

                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onChange={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row?.borrowerName}
                    </TableCell>
                    <TableCell >{row?.lenderName}</TableCell>
                    <TableCell align="right">{Number(row?.principalAmount)?.toFixed(2)}</TableCell>
                    {/* <TableCell align="right">{row?.interestAmount?.toFixed(2)}</TableCell> */}
                    <TableCell align="right">{row?.principalAmount && row?.roi && timeDiff && TotalInterestAmount(row?.principalAmount,row?.roi,timeDiff).toFixed(2)}</TableCell> 
                    <TableCell align="right">{row?.roi}%</TableCell>
                    <TableCell align="right"> 
                    {moment(row?.purchaseDate).format('MMMM Do YYYY')}
                    </TableCell>
                    <TableCell sx={{color:`${row?.status==="pending"? 'red' : "green"}`}} >{row?.status==='pending'? 'Balance':'Paid'}</TableCell>
                    <TableCell align="right">{row?.status==="paid"? row?.totalAmount?.toFixed(2) : (TotalInterestAmount(row?.principalAmount,row?.roi,timeDiff) + Number(row?.principalAmount)).toFixed(2)}</TableCell>
                    <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={()=>router.push(`/records/${row?.id}`)} >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                      <IconButton size="small" color="danger" onClick={()=>handleDelete(row?.id)} >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}  */}
            </TableBody>
          </Table>
          {!rows?.length > 0 && <Alert severity="warning">This is a warning alert — No Data found!</Alert>}
        </TableContainer>
        {rows?.length > 0 &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> }
    </Box>
  );
}
