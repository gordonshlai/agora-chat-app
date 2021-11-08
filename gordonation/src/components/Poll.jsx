import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import {Line} from 'rc-progress';

import {PollContext} from './PollContext';
import styles from './pollStyles';

const Poll = () => {
  const {
    question,
    setQuestion,
    answers: voteData,
    setAnswers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(PollContext);
  const [totalVotes, setTotalVotes] = useState(0);

  const submitVote = (e, chosenAnswer) => {
    if (!voted) {
      const newAnswer = voteData.map((answer) => {
        if (chosenAnswer.option === answer.option) {
          return {...answer, votes: answer.votes + 1};
        } else {
          return answer;
        }
      });
      setAnswers(newAnswer);
      setTotalVotes((prevTotalVotes) => prevTotalVotes + 1);
      setVoted((prevVoted) => !prevVoted);
    }
  };

  const [voted, setVoted] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setTotalVotes(0);
    setVoted(false);
    setQuestion('');
    setAnswers([
      {option: '', votes: 0},
      {option: '', votes: 0},
      {option: '', votes: 0},
      {option: '', votes: 0},
    ]);
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      content="Poll Modal"
      style={styles.customStyles}>
      <div>
        <h1>{question}</h1>
      </div>
      <div style={styles.flexColumn}>
        {voteData?.map((answer, i) =>
          !voted ? (
            <button
              style={styles.button}
              key={i}
              onClick={(e) => submitVote(e, answer)}>
              {answer.option}
            </button>
          ) : (
            <div style={styles.flexCenter} key={i}>
              <h2 style={styles.mr20}>{answer.option}</h2>
              <Line
                percent={(answer.votes / totalVotes) * 100}
                strokeWidth="5"
                trailWidth="3"
              />
              <p style={styles.ml20}>{answer.votes}</p>
            </div>
          ),
        )}
      </div>
      <h3> Total Votes: {totalVotes}</h3>
    </Modal>
  );
};

export default Poll;
