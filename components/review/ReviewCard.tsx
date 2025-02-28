import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReviewScore from './ReviewScore';
import { formatDateToLocal } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, PenTool } from 'lucide-react';
import Link from 'next/link';

const ReviewCard = ({
  fullName,
  score,
  text,
  createdAt,
  id,
  ownReviewId,
  agency,
  fullReviewLink
}: {
  fullName: string | null,
  score: number,
  text: string,
  createdAt: Date | null,
  id: string,
  ownReviewId?: string,
  agency?: string | null,
  fullReviewLink: string | null
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
      {agency && (
        <>
          <Separator className="my-4" />
          <CardFooter className="text-muted-foreground text-sm justify-between space-x-2">
            <div className="flex items-center">
              <PenTool className="mr-2" size={20} />
              {agency}
            </div>
            {fullReviewLink && (
              <Link target="_blank" href={fullReviewLink} className="underline mr-2 hover:no-underline flex items-center">
                <span className="mr-2 uppercase whitespace-nowrap">Full Review</span>
                <ExternalLink size={18} />
              </Link>
            )}
          </CardFooter>
        </> 
      )}
    </Card>
  )
}

export default ReviewCard;