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
  const ownScore: OwnScoreProps = session?.user?.id ? await fetchMovieOwnScore(id, session.user.id) : { score: null };
  const [criticSummary, userSummary] = await Promise.all(promises);
  return (
    <>
      <ReviewSummaryItem id={id} {...criticSummary} title={'Critic Score'} />
      <Separator className="my-4" />
      <ReviewSummaryItem id={id} {...userSummary} title={'User Score'} />
      <Separator className="my-4" />
      <ReviewOwnScoreItem id={id} {...ownScore} title={'My Score'} />
    </>
  )
}

export default ReviewSummary;