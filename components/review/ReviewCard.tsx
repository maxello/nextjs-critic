import React from 'react';
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getScoreClasses } from '@/lib/utils';
const ReviewCard = ({
  fullName,
  score,
  text,
  // createdAt,
}: {
  fullName: string | null,
  score: number,
  text: string,
  // createdAt: Date | null
}) => {
  return (
    <Card className="lg:col-span-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full">
            <div className={`${getScoreClasses(score)} aspect-square h-full w-full text-white flex items-center justify-center text-xl md:text-2xl font-bold`}>{score}</div>
          </div>
          <CardTitle>
            <h3 className="text-lg font-bold">{fullName}</h3>
          </CardTitle>
        </div>
        <div className="text-xs uppercase text-muted-foreground">Oct 1, 2024</div>
        {/* <div className="text-xs uppercase text-muted-foreground">{new Date(createdAt)}</div> */}
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