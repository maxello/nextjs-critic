import React from 'react';
import { Separator } from "@/components/ui/separator";
import { fetchMovieReviewByUserId, fetchMovieReviewSummary } from '@/lib/actions/movie';
import ReviewSummaryItem from './ReviewSummaryItem';
import { auth } from "@/auth";
import ReviewOwnScoreItem from './ReviewOwnScore';
import { fetchUserById } from '@/lib/actions';

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
  const userId = session?.user?.id;
  const ownReview = userId ? await fetchMovieReviewByUserId(id, userId) : null;
  const user = userId ? await fetchUserById(userId) : null;
  const userRole = user?.role;
  const [criticSummary, userSummary] = await Promise.all(promises);
  return (
    <>
      <ReviewSummaryItem {...criticSummary} title={'Critic Score'} link={`/movies/${id}/critic-reviews`} />
      <Separator className="my-4" />
      <ReviewSummaryItem {...userSummary} title={'User Score'} link={`/movies/${id}/user-reviews`} />
      <Separator className="my-4" />
      <ReviewOwnScoreItem movieId={id} score={ownReview?.score} role={userRole} title={'My Score'} />
    </>
  )
}

export default ReviewSummary;