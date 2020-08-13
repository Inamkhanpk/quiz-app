import React, { useState, useEffect } from "react";

import { fetchCategory, Difficulty } from "./../api";
import TextField from '@material-ui/core/TextField'

import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) =>({
  bg:{
    
    color:'white'
  },
  formControl:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width:400,
    color:'white',
    margin:theme.spacing(6),
    [theme.breakpoints.down('xs')]: {

      width:200
    }

    
    
  }
}));


type Props = {
  setRegistered: Function;
  setUser: Function;
};

type categoryArray = {
  id: number;
  name: string;
};


const UserData: React.FC<Props> = ({ setRegistered, setUser }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [values, setValues] = useState({
    name: "",
    difficulty: Difficulty.EASY,
    category: 9,
  });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (values.name) {
      setUser(values);
      setRegistered(true);
    } else {
      alert("Please enter your name.");
    }
  };

  const fetchReq = async () => {
    const fetchedData = await fetchCategory();
    await setCategories(fetchedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchReq();
  }, []);

  if (loading) {
    return <h1>Loading ....</h1>;
  } else {
    return (
      <Grid container>

        <Grid item xs={12} md={12}>
          <Grid container direction="column"
            justify="center"
            alignItems="center" className={classes.bg}
          >
            <h1 >Quiz Form</h1>
          </Grid>
        </Grid>




        <Grid item xs={12} md={12}>
          <Grid container direction="column"
            justify="center"
            alignItems="center"
          >
            <form onSubmit={onSubmit}>


              <Grid item xs={12} md={12}>
                <Grid container direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div>
                    <TextField
                      id="grid-first-name"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      onChange={onChange}
                      className={classes.formControl}
                    />
                  </div>
                </Grid>
              </Grid>









              <Grid item xs={12} md={12}>
                <Grid container direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="standard-select-currency"
                    select
                    className={classes.formControl}
                    value={values.difficulty}
                    onChange={onChange}

                  >
                    <MenuItem value={Difficulty.EASY}> Easy</MenuItem>
                    <MenuItem value={Difficulty.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={Difficulty.HARD}>Hard</MenuItem>
                  </TextField>
                </Grid>
              </Grid>




              <Grid item xs={12} md={12}>
                <Grid container direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="standard-select-currency"
                    select
                    className={classes.formControl}
                    value={values.category}
                    onChange={onChange}

                  >
                    {categories.map((category: categoryArray, index) => {
                      return (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>



              <Grid item xs={12} md={12}>
                <Grid container direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div>
                    <Button
                      type="submit"
                      className={classes.formControl}
                    >
                      Enter
                   </Button>
                  </div>
                </Grid>
              </Grid>

            </form>
          </Grid>
        </Grid>

      </Grid>
    );
  }
};

export default UserData;