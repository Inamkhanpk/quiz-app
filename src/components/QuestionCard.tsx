import React from 'react';
// Types
import { AnswerObject } from './QuestionPage';
// Styles
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) =>({
  buttonclick:{
    textAlign:'center',
   // width:'500px',
    backgroundColor:'#9966ff',
    margin:theme.spacing(1)
  },

  cardwidth:{
    
    opacity:0.7,
    [theme.breakpoints.down('sm')]: {
      width:300,
    
    },

    [theme.breakpoints.up('md')]: {
      width:500,
    
    },
  },
  listnumber:{
  listStyleType: 'none'
  },
}));


type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};




 const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
const classes = useStyles();
console.log(answers)
return(
  

  <div>

<Grid container>
  <Grid item xs={12} md={12}>
    <Grid container
  direction="row"
  justify="center"
  alignItems="center">
    <Card className={classes.cardwidth} >
      <CardContent>
        <Typography  color="textSecondary" gutterBottom component="p" >
        
      Question: {questionNr} / {totalQuestions}
      
        </Typography>
        <Typography variant="h5" component="h2">
        <p dangerouslySetInnerHTML={{ __html: question }} /> 
        </Typography>
       
        </CardContent>


      <CardActions>
        <ul>
      {answers.map((answer) => (
        <div
          key={answer}
          //correct={userAnswer?.correctAnswer === answer}
          //userClicked={userAnswer?.answer === answer}
          
        >
          <Button disabled={userAnswer ? true : false} value={answer} onClick={callback}   className={userAnswer && userAnswer.answer===answer?"background-color: #207000":classes.buttonclick}  >
            <li className={classes.listnumber}>
             {/* { answer }  */}
             <span
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
             </li>
          </Button>
        </div>
      ))}
      </ul>
    </CardActions>

    </Card>
    </Grid>
</Grid>
   </Grid>

      </div>
  
);}

export default QuestionCard;


