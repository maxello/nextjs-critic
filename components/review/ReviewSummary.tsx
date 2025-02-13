import React from 'react';
import { Separator } from "@/components/ui/separator";
import { fetchMovieReviewByUserId, fetchMovieReviewSummary } from '@/lib/actions/movie';
import ReviewSummaryItem from './ReviewSummaryItem';
import { auth } from "@/auth";
import ReviewOwnScoreItem from './ReviewOwnScore';

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
  const ownReview = session?.user?.id ? await fetchMovieReviewByUserId(id, session.user.id) : { score: null };
  const [criticSummary, userSummary] = await Promise.all(promises);
  return (
    <>
      <ReviewSummaryItem {...criticSummary} title={'Critic Score'} link={`/movies/${id}/critic-reviews`} />
      <Separator className="my-4" />
      <ReviewSummaryItem {...userSummary} title={'User Score'} link={`/movies/${id}/user-reviews`} />
      <Separator className="my-4" />
      <ReviewOwnScoreItem id={id} {...ownReview} title={'My Score'} />
    </>
  )
}

export default ReviewSummary;