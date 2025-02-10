import React from 'react'
import ProgressBar from '../ProgressBar'

const ReviewStatisticsItem = ({
  value,
  percentageValue,
  status
}: {
  value: number,
  percentageValue: number,
  status: 'positive' | 'mixed' | 'negative'
}) => {
  return (
    <div className="grid grid-cols-12 items-center gap-x-4">
      <span className="lg:text-right col-span-12 lg:col-span-3 capitalize">{status}</span>
      <div className="col-span-8 lg:col-span-7">
        <ProgressBar value={percentageValue} status={status} />
      </div>
      <div className="col-span-4 lg:col-span-2 whitespace-nowrap flex gap-1">
        <span className="font-semibold">{value}</span>
        ({percentageValue.toFixed(0)}%)
      </div>
    </div>
  )
}

export default ReviewStatisticsItem