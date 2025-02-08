import React from 'react';

export default async function CriticReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  console.log("id", id);
  return (
    <div>Critic Reviews Page</div>
  )
}