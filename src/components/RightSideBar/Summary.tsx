import React from 'react';
import { connect} from 'react-redux';
import { IState } from 'redux/types';
import {
  makeStyles,
  Typography
} from '@material-ui/core';
import { addCommas } from 'utils';
import DailyChart from './DailyChart';

const rows = [
  {
    label: 'Total Cases',
    value: (v: any) => addCommas(v.cases),
    color: 'red'
  },
  {
    label: 'Total Deaths',
    value: (v: any) => addCommas(v.deaths),
    color: 'red'
  },
  {
    label: 'Total Recovered',
    value: (v: any) => addCommas(v.recovered),
    color: 'green'
  },
  {
    label: 'Survival Rate (%)',
    value: (v: any) => `${((100 - (v.deaths / v.cases) * 100)).toFixed(2)}%`,
    color: '#ffffffc4'
  },
  {
    label: 'Recovered (%)',
    value: (v: any) => `${((v.recovered / v.cases) * 100).toFixed(2)}%`,
    color: '#ffffffc4'
  }
]

const mapState = (state: IState) => ({
  selectedCountry: state.selectedCountry,
  countries: state.countries,
  total: state.total
})

const useStyles = makeStyles({
  title: {
    padding: '1.5rem',
    color: '#ffffffc4'
  },
  row: {
    display: 'flex',
    color: '#ffffffc4',
    padding: '0.25rem 1rem',
    '& .MuiTypography-root': {
      flexGrow: 1,
      flexBasis: '-moz-available'
    }
  }
})

const Summary = (props: ReturnType<typeof mapState>) => {
  const { selectedCountry, total, countries } = props;
  const instance = selectedCountry ? countries[selectedCountry] : total;
  const classes = useStyles();

  if(!instance || Object.keys(instance).length === 0){
    return null
  }

  return (
    <>
      <div className={classes.title}>
        <Typography align='center' variant='h4'>{ selectedCountry ? selectedCountry : 'Worldwide'}</Typography>
      </div>
      <div>
        {
          rows.map((v: any, i: number) => (
            <div key={i} className={classes.row}>
              <Typography>{v.label}:</Typography>
              <Typography align='center' style={{ color: v.color }}>{v.value(instance)}</Typography>
            </div>
          ))
        }
      </div>
      <DailyChart />
    </>
  )
}

export default connect(mapState)(Summary);