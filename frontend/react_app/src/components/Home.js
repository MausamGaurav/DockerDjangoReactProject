import React from 'react'
import axios from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';

// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    sliders: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    slidertop: {
        marginTop: theme.spacing(4),
    }
}));

// ########################################################
// Our Custom IRIS slider. You may use the default slider instead of this
// ########################################################
const IrisSlider = withStyles({
    root: {
        color: '#751E66',
    },
    valueLabel: {
        left: 'calc(-50% -2)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    mark: {
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);

// Marks on the slider track
const marks = [{ value: 0 }, { value: 10 }];

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();

    // React hook state variable - Dimensions
    const [dimensions, setDimensions] = React.useState({
        sepal_length: 6,
        sepal_width: 6,
        petal_length: 6,
        petal_width: 6,
    });
    // React hook state variable - Prediction
    const [prediction, setPrediction] = React.useState(null)

    // Function to update the Dimensions state upon slider value change
    const handleSliderChange = name => (event, newValue) => {
        setDimensions(
            {
                ...dimensions,
                ...{ [name]: newValue }
            }
        );
    };

    // Function to make the predict API call and update the state variable - Prediction 
    const handlePredict = event => {
        // Submit Iris Flower measured dimensions as form data
        let irisFormData = new FormData();
        irisFormData.append("sepal length (cm)", dimensions.sepal_length);
        irisFormData.append("sepal width (cm)", dimensions.sepal_width);
        irisFormData.append("petal length (cm)", dimensions.petal_length);
        irisFormData.append("petal width (cm)", dimensions.petal_width);

        //Axios variables required to call the predict API
        let headers = { 'Authorization': `Token ${props.token}` };
        let url = settings.API_SERVER + '/api/predict/';
        let method = 'post';
        let config = { headers, method, url, data: irisFormData };

        //Axios predict API call
        axios(config).then(
            res => {setPrediction(res.data["Prediced Iris Species"])
            }).catch(
                error => {alert(error)})

    }

    function valuetext(value) {
        return `${value} cm`;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h5">
                                Iris Flower Dimensions
                            </Typography>
                        </Paper>
                        <Paper className={classes.sliders}>
                            <Typography id="sepal_length" variant="caption" >
                                Sepal Length (cm)
                            </Typography>
                            <IrisSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="sepal_length"
                                step={0.1}
                                min={0}
                                max={10}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("sepal_length")}
                            />
                            <Typography id="sepal_width" variant="caption" gutterBottom>
                                Sepal Width (cm)
                            </Typography>
                            <IrisSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="sepal_width"
                                step={0.1}
                                min={0}
                                max={10}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("sepal_width")}
                            />
                            <Typography id="petal_length" variant="caption" gutterBottom>
                                Petal Length (cm)
                            </Typography>
                            <IrisSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="petal_length"
                                step={0.1}
                                min={0}
                                max={10}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("petal_length")}
                            />
                            <Typography id="petal_width" variant="caption" gutterBottom>
                                Petal Width (cm)
                            </Typography>
                            <IrisSlider
                                defaultValue={6}
                                getAriaValueText={valuetext}
                                aria-labelledby="petal_width"
                                step={0.1}
                                min={0}
                                max={10}
                                valueLabelDisplay="on"
                                marks={marks}
                                className={classes.slidertop}
                                onChange={handleSliderChange("petal_width")}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" onClick={handlePredict}>
                            Predict
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="caption" display="inline">
                                Predicted Iris Species: <span>&nbsp;</span>
                            </Typography>
                            <Typography variant="body1" display="inline">
                                {prediction}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Home