'use client';

import React, { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReviewScoreStatusProps } from '@/types';

const ReviewScoreStatusFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleStringToInt = (value: ReviewScoreStatusProps) => {
    router.push(pathname + '?' + createQueryString('filterBy', value))
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set('page', '1')
      return params.toString()
    },
    [searchParams]
  )

  return (
    <Select onValueChange={handleStringToInt}>
      <SelectTrigger className="w-[180px] bg-card">
        <SelectValue placeholder="All Reviews" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All Reviews</SelectItem>
          <SelectItem value="positive">Positive</SelectItem>
          <SelectItem value="mixed">Mixed</SelectItem>
          <SelectItem value="negative">Negative</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ReviewScoreStatusFilter;