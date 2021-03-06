import React from 'react';
import "./InfoBox.css";
import {Card, CardContent, Typography} from "@material-ui/core";

function InfoBox({title, cases, total,...props}) {
    return (
        <Card onClick ={props.onClick} className="infoBox">
        <CardContent>
        <Typography className="infoBox__title" color="textSecondary">{title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <typography className= "infoBox__total" color="textSecondary">
        {total} total
        </typography>
        </CardContent>
        
        </Card>
    )
}

export default InfoBox
