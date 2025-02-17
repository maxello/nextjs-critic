import React from 'react';
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReviewScore from './ReviewScore';
import { formatDateToLocal } from '@/lib/utils';

const ReviewCard = ({
  fullName,
  score,
  text,
  createdAt,
  id,
  ownReviewId
}: {
  fullName: string | null,
  score: number,
  text: string,
  createdAt: Date | null,
  id: string,
  ownReviewId?: string
}) => {
  return (
    <Card className={`lg:col-span-6 ${ownReviewId === id ? 'border-primary bg-primary/10' : ''}`}>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <ReviewScore score={score} />
          {fullName && (
            <CardTitle className="flex flex-col">
              <h3 className="text-lg font-bold">{fullName}</h3>
              {ownReviewId === id && (
                <div className="text-xs uppercase font-normal text-muted-foreground">My review</div>
              )}
            </CardTitle>
          )}
        </div>
        <div className="text-xs uppercase text-muted-foreground">
          {formatDateToLocal(createdAt)}
        </div>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
      {/* {review.companyName && ( */}
        {/* <>
          <Separator className="my-4" />
          <CardFooter>
            <Link href={'/'} className="text-sm underline hover:no-underline underline-offset-2">{review.companyName}</Link>
          </CardFooter>
        </> */}
      {/* )} */}
    </Card>
  )
}

export default ReviewCard;