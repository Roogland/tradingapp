import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CoinList } from '../Config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, ThemeProvider, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    '& .MuiPaginationItem-root': {
         color: 'gold'
    },
  }
}));


const CoinsTable = () => {
const classes = useStyles();

  
  const [search, setSearch] = useState("");
  const [page,setPage]= useState(1);




   const {currency, symbol, coins, loading, fetchCoins} = CryptoState()

  

   useEffect(()=>{
    fetchCoins()
}, [currency]);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const handleSearch = () => {
  return coins.filter(
    (coin) => 
    coin.name.toLowerCase().includes(search) ||
    coin.symbol.toLowerCase().includes(search) 
  );
};




const navigate = useNavigate();


  return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
        <Typography variant='h4' style={{margin: 18, fontFamily: 'Montserrat'}}>
          Prices by Market Cap
        </Typography>

        <TextField label='CRYPTO SEARCH'  variant='outlined'
        style={{marginBottom: 20, width: '100%'}}
        onChange={(e) => setSearch(e.target.value)} />

        <TableContainer>
          
          {/* {loading ? (
              <LinearProgress style={{ backgroundColor: 'aqua'}} />
            ) : ( */}
                 <Table>
                  <TableHead style={{ backgroundColor: 'silver'}}>
                    <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                              <TableCell style={{color: "black", fontWeight: "700", fontFamily:"Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}>
                                 {head}
                              </TableCell>
                            ))}
                    </TableRow>

                  </TableHead>
                  <TableBody>
                    {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row)=>{
                      const profit = row.price_change_percentage_24h > 0;
                      
                      return (
                         <TableRow 
                         onClick={() => navigate(`/coins/${row.id}`)} className={classes.row} key={row.name}
                        >
                          <TableCell component='th' scope='row' styles={{display: 'flex', gap: 15,}}>
                            <img src={row?.image} alt={row.name} height='50' style={{marginBottom: 10}} />
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                              <span style={{textTransform: 'uppercase', fontSize: 22,}}>
                                {row.symbol}
                              </span>
                              <span style={{color: 'darkgrey'}}>{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align='right'>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}      
                          </TableCell>
                          <TableCell align='right' style={{color: profit > 0 ? 'rgba(14, 203, 129)' : 'red', fontWeight: 500,}}>
                             {profit && '+'}
                             {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align='right'>
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                          </TableCell>
                        </TableRow>
                      )
                    })}

                  </TableBody>
                 </Table>
            {/* //  )} */}
        </TableContainer>

          <Pagination 
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          classes= {{ul: classes.pagination}}
          count={(handleSearch()?.length / 10).toFixed(0)} 
          onChange={(_, value)=> {
            setPage(value);
            window.scroll(0, 450);
          }} 
          />
        </Container>
      </ThemeProvider>
  )
  
}

export default CoinsTable