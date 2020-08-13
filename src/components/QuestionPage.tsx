import React, { useState } from 'react';
import { fetchQuizQuestions } from './../api';
// Components
import QuestionCard from './QuestionCard';
// types
import { QuestionsState} from './../api';
// Styles
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) =>({
  next:{
   
    margin:theme.spacing(1)
  },
  textC:{
    color:'white',
    margin:theme.spacing(2)
  },
  start:{
    justifyContent:'center'
  
    
  }

  
}));

type Props = {
    userData: any;
  };


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const QuestionPage: React.FC<Props> = ({userData}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      userData.difficulty,
      userData.category
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    
      
      <Grid container >


      <Grid item xs={12}>
      <Grid container direction="row"
  justify="center"
  alignItems="center" className={classes.textC}>
        <h1>REACT QUIZ</h1>
        </Grid>
         </Grid>



         <Grid item xs={12}>
      <Grid container direction="row"
  justify="center"
  alignItems="center" >
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <div>
            <div className={classes.textC}>
            Hello <b> Mr. {userData.name}</b> Let's start uQuizy.
          </div>
          <Button variant="contained" color="primary" className={classes.start} onClick={startTrivia}>
           {userAnswers.length === TOTAL_QUESTIONS ? "Try again" : "Begin Quiz"}
        </Button>
        </div>  ) : null}
         </Grid>
         </Grid>



<Grid item xs={12}>
      <Grid container direction="row"
  justify="center"
  alignItems="center" >

{questions.length !== 0 && userAnswers.length === questions.length ? (
        <div>
          Your score is :
          <b>
            {" "}
            {score}/{TOTAL_QUESTIONS}
          </b>
          <br />
          Which is
          <b> {(score * 100) / TOTAL_QUESTIONS}%</b>
        </div>
      ) : null}
      </Grid>
         </Grid>


         <Grid item xs={12}>
      <Grid container direction="row"
  justify="center"
  alignItems="center">
        {loading ? <p>Loading Questions...</p> : null}
        </Grid>
         </Grid>



         



         <Grid item xs={12}>
       <Grid container direction="row"
  justify="center"
  alignItems="center" >
        {!loading && !gameOver  ? (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          
        />
      ) : null}
        </Grid>
         </Grid>

        
         <Grid item xs={12}>
       <Grid container direction="row"
  justify="center"
  alignItems="center" >
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <Button variant="contained" color="primary" className={classes.next} onClick={nextQuestion}>
           Next Question
         </Button>
        ) : null}
        </Grid>
         </Grid>
       
   
</Grid>
    
  );
};

export default QuestionPage;