const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty,category: any): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data.results.map((question: Question) => ({
    
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    
  })
  )
  
};


export const fetchCategory = async () => {
  const endpoint = `https://opentdb.com/api_category.php`;
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data.trivia_categories;
};





