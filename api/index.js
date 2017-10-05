import express from 'express';
import data from '../src/components/core/testData';

const router = express.Router();
const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {}); 

router.get('/contests', (req, res) => {
  res.send({
    contests: contests
  });
});

router.get('/contests/:contestId', (req, res) => {
  // req.params.contestId contains contestId
  let contest = contests[req.params.contestId];
  contest.description = 'lorem ipsum description';

  res.send(contest);
});

export default router;
