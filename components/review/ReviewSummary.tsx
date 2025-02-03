import React from 'react';
import { Separator } from "@/components/ui/separator";
import { fetchMovieOwnScore, fetchMovieReviewSummary } from '@/lib/actions/movie';
import ReviewSummaryItem from './ReviewSummaryItem';
import { auth } from "@/auth";
import ReviewOwnScoreItem from './ReviewOwnScore';
import { OwnScoreProps } from '@/types/index';

const ReviewSummary = async ({
  id
}: {
  id:string
}) => {
  const session = await auth();
  const promises = [
    fetchMovieReviewSummary(id, 'CRITIC'),
    fetchMovieReviewSummary(id, 'USER'),
  ];
  // if (session?.user?.id) {
  //   promises.push(fetchMovieOwnScore(id, session.user.id));
  // }
  const ownScore: OwnScoreProps = session?.user?.id ? await fetchMovieOwnScore(id, session.user.id) : { role: "USER", score: 0 };
  const [criticSummary, userSummary] = await Promise.all(promises);
  console.log("ownScore", ownScore);
  return (
    <div className="mb-8">
      <ReviewSummaryItem id={id} {...criticSummary} title={'Critic Score'} />
      <Separator className="my-4" />
      <ReviewSummaryItem id={id} {...userSummary} title={'User Score'} />
      <Separator className="my-4" />
      <ReviewOwnScoreItem id={id} {...ownScore} title={'My Score'} />
    </div>
  )
}

export default ReviewSummary;