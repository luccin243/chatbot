import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { Layout } from '../../components';
import InputBase from '@mui/material/InputBase';
import data from '../../data/question.json';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';

interface Steps {
  id: string;
  question: string;
  choices: string[];
}

interface Answer {
  id: string | number
  answer: string
}

const Checking = () => {
  const [questionsList, setQuestionList] = React.useState<Steps[]>([
    {
      id: '1',
      question: 'שאלה 1?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '2',
      question: 'שאלה 2?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '3',
      question: 'שאלה 3?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '4',
      question: 'שאלה 4?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '5',
      question: 'שאלה 5?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '6',
      question: 'שאלה 6?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '7',
      question: 'האם בן הזוג מכריח אותך לקיים איתו יחסי מין?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '8',
      question: 'שאלה 8?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '9',
      question: 'שאלה 9?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: '10',
      question: 'שאלה 10?',
      choices: ['1', '2', '3', '4'],
    },
  ]);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [userStep, setSteps] = React.useState(1);
  const [userInput, setUserInput] = React.useState('');
  const [fadeQ, setFadeQ] = React.useState(false);

  const messagesEndRef = React.useRef()
  const navigate = useNavigate();

  const onChange = (e: { target: { value: string } }) => {
    setUserInput(e.target.value);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setFadeQ(true)
    }, 1000);
  }, [userStep])

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onClick = (value: string) => {
    setAnswers([...answers, { id: questionsList[userStep - 1].id, answer: value }])
    if (userStep === questionsList.length) {
      // navigate('/processing')
      //Post to api
    } else {
      setFadeQ(false)
      setTimeout(() => {
        setSteps(userStep + 1)
        scrollToBottom()
      }, 500);
    }
  };
  console.log('fadeQ', fadeQ)
  const onSubmit = () => {
    setUserInput('');
  };

  const getProcenteg = () => {
    let total = 100
    let stepP = 100 / questionsList.length
    let totalDec = total - (stepP * userStep)
    return total - totalDec
  }

  return (
    <Layout>
      {/* //Header */}
      <Stack
        sx={{
          pt: 3,
          pb: 1,
          px: 2,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
        }}
        spacing={2}
      >
        <LinearProgress
          variant="determinate"
          value={getProcenteg()}
          sx={{ height: 6, borderRadius: 5 }}
        />
        <Typography textAlign="center" color="text.secondary">
          {`שאלה ${userStep} מתוך  ${questionsList.length}`}
        </Typography>
      </Stack>
      {/* Questions Contianer*/}
      <Stack
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          p: 2,
          bottom: 10,
        }}
      >
        {/* Answers */}
        <div
          style={{
            maxHeight: '68vh',
            overflowY: 'scroll',
            width: '100vw',
          }}
        >
          {answers.map((el, i) => (
            <Fade timeout={2000} in={true} key={i}>
              <Box sx={{ my: 2 }}>
                <Typography variant="h6" sx={{ px: 2 }} gutterBottom>
                  {questionsList[i].question}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    overflowX: 'scroll',
                    scrollBehavior: 'smooth',
                    whiteSpace: 'nowrap',
                    width: '100vw',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                    '&': {
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                    },
                    py: 2,
                  }}
                >
                  {el.answer && (
                    <Box>
                      <Paper
                        key={i}
                        sx={{
                          mx: 1,
                          borderRadius: 5,
                          py: 1,
                          px: 2,
                          display: 'inline-block',
                          backgroundColor: '#323740',
                          color: '#fff',
                        }}
                      >
                        {el.answer}
                      </Paper>
                    </Box>
                  )}
                </Stack>

              </Box>
            </Fade>
          ))}
          <div  //@ts-ignore
            ref={messagesEndRef} />
        </div>
        {/* Questions */}
        {
          userStep <= questionsList.length &&
          <Stack>
            <Box sx={{ my: 2 }}>
              {
                questionsList[userStep - 1].question &&

                <Typography variant="h6" sx={{ px: 2 }} gutterBottom>
                  {questionsList[userStep - 1].question}
                </Typography>
              }
              <Stack
                direction="row"
                sx={{
                  overflowX: 'scroll',
                  scrollBehavior: 'smooth',
                  whiteSpace: 'nowrap',
                  width: '100vw',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '&': {
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  },
                  py: 2,
                }}
              >
                {questionsList[userStep - 1].choices.map((choise, index) => (
                  <Box key={index}>
                          <Paper
                            onClick={() => onClick(choise)}
                            sx={{
                              mx: 1,
                              borderRadius: 5,
                              py: 1,
                              px: 2,
                              display: 'inline-block',
                            }}
                          >
                            {choise}
                          </Paper>
                  </Box>
                ))}

              </Stack>
            </Box>

          </Stack>
        }
        {/* Input */}
        <Stack
          direction="row-reverse"
          sx={{
            width: '100%',
            display: 'flex',
            height: '5vh',
            alignItems: 'center'
          }}
        >
          <Button onClick={onSubmit}>{data.submit}</Button>
          <InputBase
            onChange={onChange}
            value={userInput}
            sx={{
              borderRadius: 10,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              width: 1,
              height: 50,
              bgcolor: 'white',
              px: 3,
              mx: 1,
            }}
            placeholder={data.placeholder}
          />
        </Stack>
      </Stack >
    </Layout >

  );
};

export default Checking;
